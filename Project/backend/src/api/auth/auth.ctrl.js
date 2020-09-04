import Joi from '@hapi/joi';
import { getConnection, queryExcute } from '../../database';
import { setPassword, checkPassword, generateToken } from '../../lib/password';

// 회원가입
/*
POST /api/auth/register
{
    username: 'velopert',
    password: 'mypass123
}
*/
export const register = async (ctx) => {
  // Request Body 검증하기
  const schema = Joi.object().keys({
    userid: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { userid, password } = ctx.request.body;
  console.log(userid, password);
  try {
    // userId가 이미 존재하는가
    let sql = `select id from admin_user where id=?`;
    let conn = await getConnection();
    let exists = (await queryExcute(conn, sql, [userid]))[0];

    if (exists) {
      ctx.status = 409; // Conflict
      return;
    }

    const hashPassword = await setPassword(password);
    sql = `insert into admin_user set id=?, pwd=?`;
    conn = await getConnection();
    await queryExcute(conn, sql, [userid, hashPassword]);

    const token = generateToken(userid);
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      httpOnly: true,
    });
    ctx.body = userid;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 로그인
/*
POST /api/auth/login
{
    username: 'velopert',
    password: 'mypass123
}
*/
export const login = async (ctx) => {
  const { userid, password } = ctx.request.body;

  // username, password가 없으면 에러 처리
  if (!userid || !password) {
    ctx.status = 401; // Unauthorized
    return;
  }

  try {
    // 계정이 존재하지 않으면 에러처리
    let sql = `select id, pwd from admin_user where id=?`;
    let conn = await getConnection();
    let user = (await queryExcute(conn, sql, [userid]))[0];

    if (!user) {
      ctx.status = 401;
      return;
    }

    const valid = await checkPassword(password, user.pwd);
    // 잘못된 비밀번호
    if (!valid) {
      ctx.status = 401;
      return;
    }
    const token = generateToken(user.id);
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      httpOnly: true,
    });
    ctx.body = user.id;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 로그인 상태 확인
/*
GET /api/auth/check
*/
export const check = async (ctx) => {
  const { user } = ctx.state;

  if (!user) {
    // 로그인 중 아님
    ctx.status = 401; // Unauthorized
    return;
  }
  ctx.body = user;
};

// 로그아웃
/*
POST /api/auth/logout
*/
export const logout = async (ctx) => {
  ctx.cookies.set('access_token');
  ctx.status = 204; // No Content
};
