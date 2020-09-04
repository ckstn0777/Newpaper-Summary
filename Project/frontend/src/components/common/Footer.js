import React from 'react';
import styled from 'styled-components';
import { color } from '../../lib/styles/utils';
import { Link } from 'react-router-dom';

const FooterBlock = styled.div`
  background-color: ${color.grayDark[0]};
  grid-column: full-start / full-end;
  padding: 6rem;
`;

const NavBlock = styled.nav`
  list-style: none;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  grid-gap: 2rem;
  align-items: center;
`;

const NavAnchor = styled(Link)`
  &:link,
  &:visited {
    font-size: 1.4rem;
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
    text-align: center;
    padding: 1.5rem;
    display: block;
    transition: all 0.2s;
  }

  &:hover,
  &:active {
    background-color: rgba(#fff, 0.05);
    transform: translateY(-3px);
  }
`;

const CopyRight = styled.p`
  font-size: 1.4rem;
  color: ${color.grayLight[1]};
  margin-top: 6rem;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
  width: 65%;
`;

const Footer = () => {
  return (
    <FooterBlock>
      <NavBlock>
        <li>
          <NavAnchor to="#">Find your dream home</NavAnchor>
        </li>
        <li>
          <NavAnchor to="#">Request proposal</NavAnchor>
        </li>
        <li>
          <NavAnchor to="#">Download home planner</NavAnchor>
        </li>
        <li>
          <NavAnchor to="#">Contact us</NavAnchor>
        </li>
      </NavBlock>
      <CopyRight>&copy; Copyright 2020 by Kim Chansu.</CopyRight>
    </FooterBlock>
  );
};

export default Footer;
