import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const buttonStyle = css`
  border: none;
  border-radius: 4px;
  font-size: 1.6rem;
  font-weight: bold;
  padding: 1.5rem 2rem;
  color: white;
  outline: none;
  cursor: pointer;
  background: #343a40;
  text-decoration: none;

  &:hover {
    background: #868e96;
  }

  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const Button = (props) => {
  // props.to 값에 따라 StyledLink를 사용할지, StyledButton을 사용할지 결정
  /*a 태그는 boolean값이 임의 props로 설정되는 것을 허용하지 않음*/
  return props.to ? (
    <StyledLink {...props} cyan={props.cyan ? 1 : 0} />
  ) : (
    <StyledButton {...props} />
  );
};

export default Button;
