import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// 암호화
export const setPassword = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

// 비밀번호 확인
export const checkPassword = async (password, hashPassword) => {
  const result = await bcrypt.compare(password, hashPassword);
  return result;
};

// 토큰 생성
export const generateToken = function (userid) {
  const token = jwt.sign(
    // 첫번째 파라미터에는 토큰 안에 집어넣고 싶은 데이터를 넣어줌
    {
      userid,
    },
    process.env.JWT_SECRET, // 두번째 파라미터에는 JWT 암호를 넣어줌
    {
      expiresIn: '7d', // 7일 동안 유효함
    },
  );
  return token;
};
