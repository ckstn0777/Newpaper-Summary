import Router from 'koa-router';
import auth from './auth';
import article from './article';

const api = new Router();

api.use('/auth', auth.routes());
api.use('/article', article.routes());

export default api;
