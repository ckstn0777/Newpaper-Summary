import React from 'react';
import styled from 'styled-components';
import { color, responsive } from '../../lib/styles/utils';

const ArticleModalBlock = styled.div`
  height: 100vh;
  width: 100vw;

  position: fixed;
  top: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.8);
  z-index: 9999;
  /* opacity: 0;
  visibility: hidden; */
  transition: all 0.5s;
`;

const ArticleModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 75vw;
  max-height: 80vh;
  background-color: #f5f4f0;
  box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.2);
  border-radius: 3px;

  overflow: scroll;
  /* opacity: 0; */
  transform: translate(-50%, -50%);
  transition: all 0.4s 0.2s;

  padding: 2rem 5rem 5rem;

  display: grid;
  grid-template-columns: 45vw minmax(min-content, 25vw);
  grid-column-gap: 5rem;

  @media only screen and (max-width: ${responsive['bp-largest']}) {
    width: 100vw;
    max-height: 100vh;

    grid-column-gap: 5rem;
    grid-template-columns: 60vw minmax(min-content, 35vw);
  }
`;

const ArticleModalHeader = styled.div`
  grid-column: 1 / -1;

  display: flex;
  justify-content: flex-end;

  .popup__close {
    font-size: 3rem;
    font-weight: 600;
    text-decoration: none;

    cursor: pointer;
  }
`;

const ArticleModalLeft = styled.div`
  color: ${color.grayDark[0]};

  .popup-title {
    font-size: 2.75rem;
    margin-bottom: 1.25rem;
  }

  .popup-subtitle {
    font-size: 1.6rem;
    color: ${color.grayLight[3]};
    padding-bottom: 0.75rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid ${color.grayLight[3]};
  }

  .popup__img {
    width: 100%;
  }
  .popup__text {
    margin: 2rem 0;
    font-size: 1.6rem;
  }

  @media only screen and (max-width: ${responsive['bp-large']}) {
    grid-column: 1 / -1;
  }
`;

const ArticleModalRight = styled.div`
  .likely-news {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 3rem;

    &__text {
      h3 {
        font-size: 1.25rem;
        margin-bottom: 1.25rem;
        color: ${color.grayDark[0]};
      }
    }

    &__cards {
      display: grid;
      // grid-template-rows: repeat(auto-fit, minmax(min-content, 15rem));
      grid-template-rows: 15rem;
      grid-auto-rows: 15rem;
      grid-row-gap: 5rem;
    }

    &__card {
      display: grid;
      grid-template-rows: 5rem 10rem;
      grid-template-columns: 150px 1fr;
      justify-content: center;
      grid-column-gap: 1rem;
    }

    &__img {
      max-height: 150px;
      max-width: 150px;
      object-fit: cover;
      grid-row: 1 / -1;
    }
  }

  @media only screen and (max-width: ${responsive['bp-large']}) {
    grid-column: 1 / -1;
  }
`;

const ArticleModal = ({ modal, onCancle }) => {
  const { visible, article } = modal;

  if (!visible || !article) return null;

  return (
    <ArticleModalBlock>
      <ArticleModalContent>
        <ArticleModalHeader>
          <div className="popup__close" onClick={onCancle}>
            &times;
          </div>
        </ArticleModalHeader>
        <ArticleModalLeft>
          <h1 className="popup-title">{article.title}</h1>
          <h3 className="popup-subtitle">기사입력 2020.08.02. 오후 6:04</h3>

          <div className="popup-articleBody">
            {/* <img
              src="/images/popup_image1.jpg"
              alt="Article 1"
              className="popup__img"
            /> */}
            <p
              className="popup__text"
              dangerouslySetInnerHTML={{ __html: article.content }}
            ></p>
          </div>
        </ArticleModalLeft>
        <ArticleModalRight>
          <h3 className="likely-news">연관뉴스 및 언론보도</h3>
          <div className="likely-news__cards">
            <div class="likely-news__card">
              <img
                src="/images/likely-image1.jpg"
                alt="Likely 1"
                className="likely-news__img"
              />
              <div className="likely-news__text">
                <h3>중부지방 5일까지 물폭탄·500mm</h3>
                <p>
                  제4호 태풍 '하구핏'이 우리나라에 영향을 주면서 오는 5일까지
                  중부지방에 많은 비가 내릴 전망이다.
                </p>
              </div>
            </div>
            <div className="likely-news__card">
              <img
                src="/images/likely-image2.jpg"
                alt="Likely 1"
                className="likely-news__img"
              />
              <div className="likely-news__text">
                <h3>중부지방 5일까지 물폭탄·500mm</h3>
                <p>
                  제4호 태풍 '하구핏'이 우리나라에 영향을 주면서 오는 5일까지
                  중부지방에 많은 비가 내릴 전망이다.
                </p>
              </div>
            </div>
            <div className="likely-news__card">
              <img
                src="/images/likely-image3.jpg"
                alt="Likely 1"
                className="likely-news__img"
              />
              <div className="likely-news__text">
                <h3>중부지방 5일까지 물폭탄·500mm</h3>
                <p>
                  제4호 태풍 '하구핏'이 우리나라에 영향을 주면서 오는 5일까지
                  중부지방에 많은 비가 내릴 전망이다.
                </p>
              </div>
            </div>
            <div className="likely-news__card">
              <img
                src="/images/likely-image4.jpg"
                alt="Likely 1"
                className="likely-news__img"
              />
              <div className="likely-news__text">
                <h3>중부지방 5일까지 물폭탄·500mm</h3>
                <p>
                  제4호 태풍 '하구핏'이 우리나라에 영향을 주면서 오는 5일까지
                  중부지방에 많은 비가 내릴 전망이다.
                </p>
              </div>
            </div>
          </div>
        </ArticleModalRight>
      </ArticleModalContent>
    </ArticleModalBlock>
  );
};

export default ArticleModal;
