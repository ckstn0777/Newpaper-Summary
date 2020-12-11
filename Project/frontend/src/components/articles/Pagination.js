import React, { useEffect } from 'react';
import styled from 'styled-components';
import qs from 'qs';
import Button from '../common/Button';
import { withRouter } from 'react-router-dom';
import { listArticle } from '../../modules/articles';
import moment from 'moment';

const PaginationBlock = styled.div`
  width: 320px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
`;
const PageNumber = styled.div`
  font-size: 2.25rem;
  font-weight: 600;
`;

const buildLink = ({ category, selectedDate, page }) => {
  const query = qs.stringify({ category, selectedDate, page });
  return `?${query}`;
};

const Pagination = ({ lastPage, location, dispatch }) => {
  let {
    category = 'all',
    selectedDate = moment(new Date()).format('YYYYMMDD'),
    page = 1,
  } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  page = parseInt(page, 10);

  useEffect(() => {
    dispatch(
      listArticle({
        category,
        page,
        selectedDate,
      }),
    );
  }, [dispatch, category, page, selectedDate]);

  return (
    <PaginationBlock>
      <Button
        disabled={page === 1}
        to={
          page === 1
            ? undefined
            : buildLink({ category, selectedDate, page: page - 1 })
        }
      >
        prev
      </Button>
      <PageNumber>{page}</PageNumber>
      <Button
        disabled={page === lastPage}
        to={
          page === lastPage
            ? undefined
            : buildLink({ category, selectedDate, page: page + 1 })
        }
      >
        next
      </Button>
    </PaginationBlock>
  );
};

export default withRouter(Pagination);
