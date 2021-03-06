import { getConnection, queryExcute } from '../../database';

/* 포스트 목록 조회
GET /api/posts?userid=&category=&page=
*/
export const list = async (ctx) => {
  const { userid, category, selectedDate } = ctx.query;
  const page = parseInt(ctx.query.page || '1', 10);

  console.log(selectedDate);

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  try {
    let sql = null;
    let conn = null;
    let article = null;
    let articleCount = null;

    if (category === 'all') {
      sql = `select id, title, content, summary_content, category, save_date, update_date from article where DATE_FORMAT(save_date, "%Y%m%d")=? order by id DESC limit ?,8`;
      conn = await getConnection();
      article = await queryExcute(conn, sql, [selectedDate, (page - 1) * 8]);

      sql = `select count(*) as count from article where DATE_FORMAT(save_date, "%Y%m%d")=?`;
      conn = await getConnection();
      articleCount = (await queryExcute(conn, sql, [selectedDate]))[0].count;
    } else {
      sql = `select id, title, content, summary_content, category, save_date, update_date from article where DATE_FORMAT(save_date, "%Y%m%d")=? and category=? order by id DESC limit ?,8`;
      conn = await getConnection();
      article = await queryExcute(conn, sql, [
        selectedDate,
        category,
        (page - 1) * 8,
      ]);

      sql = `select count(*) as count from article where category=? and DATE_FORMAT(save_date, "%Y%m%d")=?`;
      conn = await getConnection();
      articleCount = (await queryExcute(conn, sql, [category, selectedDate]))[0]
        .count;
    }

    console.log(articleCount);

    // 마지막 페이지를 번호를 찾아서 HTTP Header에 추가해서 보내줌
    ctx.set('Last-Page', Math.ceil(articleCount / 8));
    ctx.body = article;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 특정 포스트 조회
GET /api/posts/:id
*/
export const read = async (ctx) => {};
