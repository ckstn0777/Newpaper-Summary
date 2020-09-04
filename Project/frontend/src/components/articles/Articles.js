import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { color, responsive } from '../../lib/styles/utils';
import ArticleCard from './ArticleCard';
import { withRouter } from 'react-router-dom';
import ArticleModal from '../popup/ArticleModal';
import { isNullLiteralTypeAnnotation } from '../../../../../../../AppData/Local/Microsoft/TypeScript/3.9/node_modules/@babel/types/lib/index';

const ArticlesBlock = styled.div`
  background-color: ${color.grayLight[2]};
  grid-column: full-start / full-end;
  padding: 5rem 10rem;

  @media only screen and (max-width: ${responsive['bp-medium']}) {
    padding: 5rem;
  }
`;

const ArticlesHeading = styled.div`
  text-align: center;
  font-size: 2.25rem;
  text-transform: uppercase;
  word-spacing: 5px;
  letter-spacing: 5px;
  margin-bottom: 4.25rem;

  display: flex;
  justify-content: space-between;
`;

const CardsBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(28rem, 1fr));
  grid-auto-flow: dense;
  grid-gap: 10rem;
  align-items: start;

  @media only screen and (max-width: ${responsive['bp-large']}) {
    grid-template-columns: repeat(auto-fill, minmax(23rem, 1fr));
    grid-gap: 6rem;
  }
`;

const SelectBlock = styled(Select)`
  width: 200px;
  font-size: 1.6rem;
`;

const Articles = ({ articles, loading, error, children, history }) => {
  const [category, setCategory] = useState({
    selectedOption: null,
  });
  const [date, setDate] = useState({
    selectedDate: new Date(),
  });
  const [modal, setModal] = useState({
    visible: false,
    article: null,
  });
  let selectedArticle = null;

  const options = [
    { value: 'all', label: 'all' },
    { value: '정치', label: '정치' },
    { value: '경제', label: '경제' },
    { value: '사회', label: '사회' },
    { value: '생활', label: '생활' },
    { value: '세계', label: '세계' },
    { value: 'IT', label: 'IT' },
    { value: '스포츠', label: '스포츠' },
    { value: '연예', label: '연예' },
  ];

  // 카테고리 변경시
  const onCategoryChange = useCallback(
    (selectedOption) => {
      setCategory({ selectedOption });

      history.push({
        pathname: '',
        search: `?category=${selectedOption.value}`,
      });
    },
    [history],
  );

  // 날짜 변경시
  const onDateChange = useCallback((selectedDate) => {
    console.log(selectedDate);
    setDate({ selectedDate });
  }, []);

  // 팝업창 On/Off 시
  const onCancle = () => {
    setModal({ ...modal, visible: false });
  };
  const onArticleOpen = (articleId) => {
    selectedArticle = articles.filter((article) => article.id === articleId);
    setModal({ ...modal, visible: true, article: selectedArticle[0] });
  };

  // 에러 발생시
  if (error) {
    return <div>에러가 발생했습니다</div>;
  }

  return (
    <>
      <ArticlesBlock>
        <ArticlesHeading>
          <DatePicker
            locale="ko"
            selected={date.selectedDate}
            onChange={onDateChange}
            popperModifiers={{ preventOverflow: { enabled: true } }}
          />
          <h3>Newest articles</h3>
          <SelectBlock
            value={category.selectedOption}
            onChange={onCategoryChange}
            options={options}
            placeholder="CATEGORY..."
          />
        </ArticlesHeading>
        <CardsBlock>
          {!loading &&
            articles &&
            articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onArticleOpen={onArticleOpen}
              />
            ))}
        </CardsBlock>
        {children}
      </ArticlesBlock>
      <ArticleModal
        modal={modal}
        onCancle={onCancle}
        selectedArticle={selectedArticle}
      />
    </>
  );
};

export default withRouter(Articles);
