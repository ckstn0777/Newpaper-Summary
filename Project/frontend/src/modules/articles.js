import { createAction, handleActions } from 'redux-actions';
import createRequestSaga from '../lib/createRequestSaga';
import * as articleAPI from '../lib/api/articles';
import { takeLatest } from 'redux-saga/effects';

const LIST_ARTICLE = 'article/LIST_ARTICLE';
const LIST_ARTICLE_SUCCESS = 'article/LIST_ARTICLE_SUCCESS';
const LIST_ARTICLE_FAILURE = 'article/LIST_ARTICLE_FAILURE';

export const listArticle = createAction(LIST_ARTICLE, ({ category, page }) => ({
  category,
  page,
}));

const listArticleSaga = createRequestSaga(LIST_ARTICLE, articleAPI.list);
export function* articleSaga() {
  yield takeLatest(LIST_ARTICLE, listArticleSaga);
}

const initialState = {
  articles: null,
  error: null,
  lastPage: 1,
};

const articles = handleActions(
  {
    [LIST_ARTICLE_SUCCESS]: (state, { payload: articles, meta: response }) => ({
      ...state,
      articles,
      lastPage: parseInt(response.headers['last-page'], 10),
    }),
    [LIST_ARTICLE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default articles;
