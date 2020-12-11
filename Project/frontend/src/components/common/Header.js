import React from 'react';
import styled from 'styled-components';
import { color, responsive } from '../../lib/styles/utils';
import Button from './Button';

const HeaderBlock = styled.header`
  background-color: ${color.grayDark[0]};
  grid-column: full-start / full-end;
  font-size: 1.4rem;
  border-bottom: 1px solid ${color.grayLight[1]};

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: ${responsive['bp-large']}) {
    flex-wrap: wrap;
  }
`;

const HeaderTitle = styled.h1`
  color: ${color.grayLight[1]};
  margin-left: 2rem;
`;

const NavBlock = styled.nav`
  display: flex;
  align-self: stretch;
  align-items: center;

  flex: 1 0 0;
  justify-content: flex-end;

  @media only screen and (max-width: ${responsive['bp-large']}) {
    flex: 0 0 100%;
    justify-content: space-between;
    order: 10;
  }
`;

const NavBox = styled.div`
  display: inline-block;

  padding: 0 2rem;
  cursor: pointer;
`;

const NavAnchor = styled.h3`
  color: ${color.grayLight[3]};
  text-transform: uppercase;

  &:hover {
    color: ${color.grayDark[0]};
  }
`;

const HeaderButton = styled(Button)`
  margin-right: 1.5rem;
  padding: 1rem 2rem;
`;

const Header = ({ user, onLogout }) => {
  return (
    <HeaderBlock>
      <HeaderTitle>Summary NewPaper (SN)</HeaderTitle>
      <NavBlock>
        <NavBox>
          <NavAnchor>Blog</NavAnchor>
        </NavBox>
        <NavBox>
          <NavAnchor>Articles</NavAnchor>
        </NavBox>
        <NavBox>
          <NavAnchor>Gallery</NavAnchor>
        </NavBox>
        <NavBox>
          <NavAnchor>Contact</NavAnchor>
        </NavBox>
      </NavBlock>
      {user ? (
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <h3 style={{ fontWeight: 600, marginRight: '1rem' }}>{user.id}님</h3>
          <HeaderButton onClick={onLogout}>로그아웃</HeaderButton>
        </div>
      ) : (
        <HeaderButton to="/login">로그인</HeaderButton>
      )}
    </HeaderBlock>
  );
};

export default Header;
