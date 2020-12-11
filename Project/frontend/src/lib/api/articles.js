import client from './client';
import qs from 'qs';

// 기사 목록 불러오기
export const list = async ({ userid, category, page, selectedDate }) => {
  console.log(userid, category, page, selectedDate);
  const queryString = qs.stringify({
    userid,
    category,
    page,
    selectedDate,
  });
  return client.get(`/api/article?${queryString}`);
};
