import mysql from 'mysql';
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
  debug: false,
  multipleStatements: true,
});

// DB 연결
export const getConnection = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) {
        reject(err);
      }
      resolve(conn);
    });
  });
};

// DB 쿼리 실행
export const queryExcute = (conn, sql, sqlParams) => {
  return new Promise((resolve, reject) => {
    conn.query(sql, sqlParams, (err, result) => {
      if (conn) {
        conn.release();
      }
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};
