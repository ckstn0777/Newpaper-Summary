import React from 'react';
import styled from 'styled-components';
import { responsive } from '../../lib/styles/utils';

/*
회원가입/로그인 페이지의 레이아웃을 담당하는 컴포넌트입니다
*/
const AuthTemplateBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 100vh;
`;

const Pictures = styled.div`
  background-image: linear-gradient(
      rgba(134, 142, 150, 0.8),
      rgba(134, 142, 150, 0.8)
    ),
    url(/images/back.jpg);

  background-size: cover;
  background-position: bottom;

  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(6, 1fr);
  align-items: center;

  @media only screen and (max-width: ${responsive['bp-medium']}) {
    display: none;
  }
`;

const PictureTextBox = styled.div`
  width: 100%;
  grid-row: 2 / 6;
  grid-column: 2 / 6;

  .pictures__textbox--title {
    font-size: 3.5rem;
    color: white;
    text-align: right;
    padding-bottom: 6rem;
    border-bottom: solid 1px white;
  }

  .pictures__textbox--subtitle {
    font-size: 2.25rem;
    color: white;
    text-align: right;
    margin-top: 10rem;
  }
`;

const AuthTemplate = ({ children }) => {
  return (
    <AuthTemplateBlock>
      <Pictures>
        <PictureTextBox>
          <h1 class="pictures__textbox--title">
            Summary <br />
            Newpapers (SN)
          </h1>
          <h3 class="pictures__textbox--subtitle">
            Save your time <br />
            by reading the summary article.
          </h3>
        </PictureTextBox>
      </Pictures>
      {children}
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;
