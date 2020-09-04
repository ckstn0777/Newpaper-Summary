import { combineReducers } from 'redux';
import loading from './loading';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import articles, { articleSaga } from './articles';

const rootReducer = combineReducers({
  loading,
  auth,
  user,
  articles,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), articleSaga()]);
}

export default rootReducer;
