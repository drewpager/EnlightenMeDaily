import React from 'react'
import { QuoteFilter } from '../../../../lib/graphql/globalTypes';
import { Select } from 'antd';

interface Props {
  filter: QuoteFilter;
  setFilter: (filter: QuoteFilter) => void;
}

const { Option } = Select;

export const QuotesFilter = ({ filter, setFilter}: Props) => {
  return (
    <div className="quotes-filters">
      <span>Filter by:</span>
      <Select value={filter} onChange={(filter: QuoteFilter) => setFilter(filter)}>
        <Option value={QuoteFilter.MOST_RECENT}>Most Recent</Option>
        <Option value={QuoteFilter.OLDEST}>Oldest</Option>
      </Select>
    </div>
  );
};