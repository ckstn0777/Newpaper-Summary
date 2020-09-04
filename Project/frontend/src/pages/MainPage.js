import React from 'react';
import styled from 'styled-components';
import { responsive } from '../lib/styles/utils';
import ImageSlider from '../components/ImageSlide/ImageSlider';
import Footer from '../components/common/Footer';
import HeaderContainer from '../containers/common/HeaderContainer';
import ArticlesContainer from '../containers/articles/ArticlesContainer';

const MainPageBlock = styled.div`
  display: grid;
  grid-template-rows: 8vh 80vh min-content min-content;
  grid-template-columns:
    [full-start] minmax(6rem, 1fr) [center-start] repeat(
      8,
      [col-start] minmax(min-content, 16rem) [col-end]
    )
    [center-end] minmax(6rem, 1fr) [full-end];

  @media only screen and (max-width: ${responsive['bp-large']}) {
    grid-template-rows: 12vh 70vh min-content min-content;
  }
`;

const MainPage = () => {
  return (
    <MainPageBlock>
      <HeaderContainer />
      <ImageSlider />
      <ArticlesContainer />
      <Footer />
    </MainPageBlock>
  );
};

export default MainPage;
