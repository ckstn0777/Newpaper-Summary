import React from 'react';
import styled from 'styled-components';
import { color, responsive } from '../../lib/styles/utils';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

/*
회원가입 또는 로그인 폼을 보여줍니다
*/
const AuthFormBlock = styled.div`
  background-color: #f1f3f5;
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(6, 1fr);
  align-items: center;

  @media only screen and (max-width: ${responsive['bp-medium']}) {
    grid-column: 1 / 3;
  }

  .form__header {
    width: 100%;
    grid-row: 2 / 3;
    grid-column: 2 / 6;
    font-size: 2.25rem;
    align-self: flex-start;
  }
`;

const FormBlock = styled.form`
  grid-row: 3 / 5;
  grid-column: 2 / 6;

  display: grid;
  grid-template-rows: repeat(2, min-content);
  grid-row-gap: 4.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;

  @media only screen and (max-width: ${responsive['bp-large']}) {
    width: 100%;
  }
`;

const LableBlock = styled.label`
  font-size: 1.6rem;
  text-transform: uppercase;
  font-weight: 700;
  color: #adb5bd;
  margin-bottom: 1rem;
`;

const InputBlock = styled.input`
  font-size: 1.5rem;
  font-family: inherit;
  padding: 1.5rem 2rem;
  border-radius: 2px;
  background-color: rgba(white, 0.5);
  border: none;
  border: 3px solid ${color.grayDark[3]};

  display: block;
  transition: all 0.5s;
`;

const Footer = styled.h3`
  width: 100%;
  grid-row: 5 / 6;
  grid-column: 2 / 6;
  font-size: 1.6rem;
  align-self: flex-end;

  .form__bottom--highlight {
    color: #228be6;
  }
`;

/* 인증 실패시 에러를 보여줍니다 */
const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 1.3rem;
  margin-top: 1rem;
`;

const textMap = {
  login: '로그인',
  register: '회원가입',
};

const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
  const text = textMap[type];

  return (
    <AuthFormBlock>
      {type === 'login' ? (
        <h3 className="form__header">
          Please enter your ID and <br /> password to login.
        </h3>
      ) : (
        <h3 className="form__header">
          Please enter your ID and <br /> password to register.
        </h3>
      )}

      <FormBlock onSubmit={onSubmit}>
        <FormGroup>
          <LableBlock htmlFor="userid" className="form__label">
            id
          </LableBlock>
          <InputBlock
            name="userid"
            placeholder="아이디"
            onChange={onChange}
            value={form.userid}
          />
        </FormGroup>

        <FormGroup>
          <LableBlock htmlFor="password" className="form__label">
            password
          </LableBlock>
          <InputBlock
            name="password"
            placeholder="비밀번호"
            type="password"
            onChange={onChange}
            value={form.password}
          />
        </FormGroup>

        {type === 'register' && (
          <FormGroup>
            <LableBlock htmlFor="passwordConfirm" className="form__label">
              password confirm
            </LableBlock>
            <InputBlock
              name="passwordConfirm"
              placeholder="비밀번호 확인"
              type="password"
              onChange={onChange}
              value={form.passwordConfirm}
            />
          </FormGroup>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <FormGroup>
          <Button>{text}</Button>
        </FormGroup>
      </FormBlock>

      {type === 'login' ? (
        <Footer>
          Don't have an account? &nbsp;
          <Link className="form__bottom--highlight" to="/register">
            Sign Up
          </Link>{' '}
        </Footer>
      ) : (
        <Footer>
          Do you already have an account? &nbsp;
          <Link className="form__bottom--highlight" to="/login">
            Sign Up
          </Link>
        </Footer>
      )}

      {/* <Footer>
        {type === 'login' ? (
          <Link to="/register">회원가입</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </Footer> */}
    </AuthFormBlock>
  );
};

export default AuthForm;
