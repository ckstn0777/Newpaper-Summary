import Router from 'koa-router';
import * as articleCtrl from './article.ctrl';

const article = new Router();

article.get('/', articleCtrl.list);
article.get('/:id', articleCtrl.read);

export default article;
