import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Articles from '../../components/articles/Articles';
import Pagination from '../../components/articles/Pagination';

const ArticlesContainer = () => {
  const { articles, error, loading, lastPage } = useSelector(
    ({ articles, loading }) => ({
      articles: articles.articles,
      error: articles.error,
      loading: loading['article/LIST_ARTICLE'],
      lastPage: articles.lastPage,
    }),
  );
  const dispatch = useDispatch();

  return (
    <Articles articles={articles} loading={loading} error={error}>
      <Pagination lastPage={lastPage} dispatch={dispatch} />
    </Articles>
  );
};

export default ArticlesContainer;
