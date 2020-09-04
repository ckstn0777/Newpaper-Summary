import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const CardImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
`;

const CartTextBox = styled.div`
  background-color: white;
  padding: 2rem;

  .content-post {
    font-size: 1.1rem;
    text-transform: uppercase;
  }

  .content-title {
    font-size: 2rem;
    margin-bottom: 1.25rem;
  }

  .content-detail {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  .content__link {
    font-size: 1.25rem;
    text-decoration: none;
    padding-right: 2rem;

    display: inline-flex;
    align-items: center;
    cursor: pointer;
  }

  .content__icon {
    height: 2.25rem;
    width: 2.25rem;

    margin-right: 0.85rem;

    &--heart {
      fill: #ffc9c9;
    }

    &--chat {
      fill: #a5d8ff;
    }

    &--more {
      fill: #b2f2bb;
    }
  }
`;

const ArticleCard = ({ article, onArticleOpen }) => {
  const { id, title, summary_content, save_date } = article;

  const postDate = moment(save_date).format('DD MMMM YYYY');

  return (
    <div>
      <CardImage src={'/images/card-image1.jpg'} alt="Card 1" />
      <CartTextBox>
        <p className="content-post">posted on: {postDate}</p>
        <h3 className="content-title">{title}</h3>
        <p
          className="content-detail"
          dangerouslySetInnerHTML={{ __html: summary_content }}
        />
        <div class="content__icons">
          <div class="content__link">
            <svg class="content__icon content__icon--heart">
              <use xlinkHref="images/sprite.svg#icon-heart"></use>
            </svg>
            <span>31</span>
          </div>
          <div class="content__link">
            <svg class="content__icon content__icon--chat">
              <use xlinkHref="images/sprite.svg#icon-chat"></use>
            </svg>
            <span>21</span>
          </div>
          <div class="content__link" onClick={() => onArticleOpen(id)}>
            <svg class="content__icon content__icon--more">
              <use xlinkHref="images/sprite.svg#icon-list"></use>
            </svg>
            <span>Read more</span>
          </div>
        </div>
      </CartTextBox>
    </div>
  );
};

export default ArticleCard;
