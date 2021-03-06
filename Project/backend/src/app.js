require('dotenv').config();

import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import path from 'path';
import send from 'koa-send';

import api from './api';
import jwtMiddleware from './lib/jwtMiddleware';

// 비구조화 할당을 통해 process.env내부 값에 대한 레퍼런스 만들기
const { PORT } = process.env;

const app = new Koa();
const router = new Router();

// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser());
app.use(jwtMiddleware);

// 라우터 설정(api 라우터 적용)
router.use('/api', api.routes());
app.use(router.routes()).use(router.allowedMethods());

// const buildDirectory = path.resolve(__dirname, '../../frontend/build');
// app.use(serve(buildDirectory));
// app.use(async (ctx) => {
//   // Not Found이고, 주소가 /api로 시작하지 않는 경우
//   if (ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
//     // index.html 내용 반환
//     await send(ctx, 'index.html', { root: buildDirectory });
//   }
// });

// PORT가 정해지지 않았다면 기본으로 4000사용
const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listening to port ' + port);
});
