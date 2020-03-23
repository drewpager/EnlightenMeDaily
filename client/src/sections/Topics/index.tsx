import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { List, Layout, Typography } from 'antd';
import { QUOTES } from '../../lib/graphql/queries/Quotes';
import { Quotes as QuotesData, QuotesVariables } from '../../lib/graphql/queries/Quotes/__generated__/Quotes';
import { QuoteCard } from '../../lib/components/QuoteCard';
import { QuoteFilter } from '../../lib/graphql/globalTypes';

interface MatchParams {
  category: string;
}

const PAGE_LIMIT = 8;
const { Content } = Layout;
const { Title } = Typography;

export const Topics = ({ match }: RouteComponentProps<MatchParams>) => {
  const { data } = useQuery<QuotesData, QuotesVariables>(QUOTES, {
    variables: {
      category: match.params.category,
      filter: QuoteFilter.MOST_RECENT,
      limit: PAGE_LIMIT,
      page: 1
    }
  })

  const quotes = data ? data.quotes : null;
  const quotesSection = quotes && match.params.category ? match.params.category : null;
  
  const quoteCategoryElement = quotesSection ? (
    <Title level={3}>
      Results for "{quotesSection}"
    </Title>
  ) : null;
  const quotesSectionElement = quotes ? (
    <List
      grid={{
        gutter: 8,
        xs: 1,
        sm: 2,
        lg: 4 
      }}
      dataSource={quotes.result}
      renderItem={quote => (
        <List.Item>
          <QuoteCard quotes={quote} />
        </List.Item>
      )}
    />
  ) : null;

  return (
    <Content className="quotes">
      {quoteCategoryElement}
      {quotesSectionElement}
    </Content>
  )
}