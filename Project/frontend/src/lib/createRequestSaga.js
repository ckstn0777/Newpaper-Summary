import { put, call } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  // 사가 함수를 반환해줌
  return function* (action) {
    yield put(startLoading(type)); // 디스패치 -- 로딩 시작
    try {
      const response = yield call(request, action.payload); // 비동기 API 함수 호출
      yield put({
        type: SUCCESS,
        payload: response.data,
        meta: response,
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(type)); // 로딩 끝
  };
}
