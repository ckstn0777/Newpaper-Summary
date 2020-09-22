import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import DatePicker, { registerLocale } from 'react-datepicker';
import { color, responsive } from '../../lib/styles/utils';
import ArticleCard from './ArticleCard';
import { withRouter } from 'react-router-dom';
import ArticleModal from '../popup/ArticleModal';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import './react-datepicker-custom.scss';
import Loading from '../common/Loading';

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
  width: 18rem;
  font-size: 1.6rem;
`;

const DateBlock = styled.div`
  width: 18rem;
`;

registerLocale('ko', ko);

const Articles = ({ articles, loading, error, children, history }) => {
  // 카데고리 상태
  const [category, setCategory] = useState({
    selectedOption: null,
  });
  // 날짜 상태
  const [date, setDate] = useState(new Date());
  // 모달 상태
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
    setDate(selectedDate);
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
          <DateBlock>
            <DatePicker
              selected={date}
              onChange={onDateChange}
              locale="ko"
              dateFormat="yyyy.MM.dd(eee)"
              maxDate={new Date()}
              placeholderText="Weeks start on Monday"
            />
          </DateBlock>

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
      {loading && <Loading />}
    </>
  );
};

export default withRouter(Articles);
