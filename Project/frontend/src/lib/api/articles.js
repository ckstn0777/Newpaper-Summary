import client from './client';
import qs from 'qs';

// 기사 목록 불러오기
export const list = async ({ userid, category, page }) => {
  const queryString = qs.stringify({
    userid,
    category,
    page,
  });
  return client.get(`/api/article?${queryString}`);
};
