import React from 'react';
import { Pagination } from 'antd';

interface Props {
  total: number;
  page: number;
  limit: number;
  setPage: (page: number) => void;
}

export const QuotesPagination = ({ total, page, limit, setPage }: Props) => {
  return (
    <Pagination 
      current={page}
      total={total}
      defaultPageSize={limit}
      hideOnSinglePage
      onChange={(page: number) => setPage(page)}
      className="quotes-pagination"
    />
  );
};