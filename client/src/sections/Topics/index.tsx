import React, { useState } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { List, Layout, Typography } from 'antd';
import { QUOTES } from '../../lib/graphql/queries/Quotes';
import { Quotes as QuotesData, QuotesVariables } from '../../lib/graphql/queries/Quotes/__generated__/Quotes';
import { QuoteCard } from '../../lib/components/QuoteCard';
import { QuoteFilter } from '../../lib/graphql/globalTypes';
import { QuotesFilter, QuotesPagination, QuotesSkeleton } from './components';
import { ErrorBanner } from '../../lib/components';

const { Text, Paragraph } = Typography;
interface MatchParams {
  category: string;
}

const PAGE_LIMIT = 8;
const { Content } = Layout;
const { Title } = Typography;

export const Topics = ({ match }: RouteComponentProps<MatchParams>) => {
  const [filter, setFilter] = useState(QuoteFilter.MOST_RECENT);
  const [page, setPage] = useState(1);
  const { data, loading, error } = useQuery<QuotesData, QuotesVariables>(QUOTES, {
    variables: {
      category: match.params.category,
      filter: QuoteFilter.MOST_RECENT,
      limit: PAGE_LIMIT,
      page: 1
    }
  })

  if (loading) {
    return (
      <Content className="quotes">
        <QuotesSkeleton />
      </Content>
    )
  }

  if (error) {
    return (
      <Content className="quotes">
        <ErrorBanner description={`We either couldn't find anything matching your search or have encountered an error.
            If you're searching for a unique quote, try searching again with more common keywords.`} />
        <QuotesSkeleton />
      </Content>
    )
  }

  const quotes = data ? data.quotes : null;
  const quotesSection = quotes && match.params.category ? match.params.category : null;
  
  const quoteCategoryElement = quotesSection ? (
    <Title level={3}>
      Results for "{quotesSection}"
    </Title>
  ) : null;
  const quotesSectionElement = quotes && quotes.result.length ? (
    <div>
      <QuotesPagination 
        total={quotes.total}
        page={page}
        limit={PAGE_LIMIT}
        setPage={setPage}
      />
      <QuotesFilter filter={filter} setFilter={setFilter} />
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
    </div>
  ) : (
    <div>
      <Paragraph>It appears no quotes exist for {" "}
        <Text mark>"{quotesSection}"</Text>
      </Paragraph>
      <Paragraph>
        Be the first person to <Link to="/create">add this quote.</Link>
      </Paragraph>
    </div>
  );

  return (
    <Content className="quotes">
      {quoteCategoryElement}
      {quotesSectionElement}
    </Content>
  )
}