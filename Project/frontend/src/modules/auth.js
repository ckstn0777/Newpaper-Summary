import { createAction, handleActions } from 'redux-actions';
import createRequestSaga from '../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';
import * as authAPI from '../lib/api/auth';

// 액션 객체
const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

const REGISTER = 'auth/REGISTER';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

// 액션 생성함수
export const login = createAction(LOGIN, ({ userid, password }) => ({
  userid,
  password,
}));
export const register = createAction(REGISTER, ({ userid, password }) => ({
  userid,
  password,
}));
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // register, login 중 하나
    key, // userid, password, passwordConfirm 중 하나
    value, // 실제 값
  }),
);
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form); // register / login

// 사가 생성
export const loginSaga = createRequestSaga(LOGIN, authAPI.login);
export const registerSaga = createRequestSaga(REGISTER, authAPI.register);
export function* authSaga() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(REGISTER, registerSaga);
}

// 초기상태
const initialState = {
  register: {
    userid: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    userid: '',
    password: '',
  },
  auth: null,
  authError: null,
};

// 리듀서
const auth = handleActions(
  {
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value; // // 예: state.register.username을 바꾼다
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null,
    }),
  },
  initialState,
);

export default auth;
