import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { RouteComponentProps } from 'react-router-dom';
import { Layout, Row, Col, Affix } from 'antd';
import { PageSkeleton, ErrorBanner } from '../../lib/components/';
import { QUOTE } from '../../lib/graphql/queries';
import { Quote as QuoteData, QuoteVariables } from '../../lib/graphql/queries/Quote/__generated__/Quote';
import { QuoteDetails, RelatedQuotes } from './components/';

const { Content } = Layout;
interface MatchParams {
  id: string;
}

export const Quote = ({ match }: RouteComponentProps<MatchParams>) => {
  const { loading, error, data } = useQuery<QuoteData, QuoteVariables>(QUOTE, {
    variables: {
      id: match.params.id
    }
  })

  if (loading) {
    return (
      <Content className="quotes">
        <PageSkeleton />
      </Content>
    )
  }

  if (error) {
    return (
      <Content className="quote">
        <ErrorBanner description="Could not find quote or it does not exist. Please try again!"/>
        <PageSkeleton />
      </Content>
    )
  }

  const quote = data ? data.quote : null;
  const quoteDetailsElement = quote ? <QuoteDetails quoteData={quote} /> : null;
  const relatedQuotesElement = quote && quote.category ? <Affix offsetTop={40}><RelatedQuotes categoryData={quote.category} /></Affix>: null;
  
  return (
    <Content className="quote">
      <Row gutter={24} typeof="flex" justify="space-between">
        <Col xs={24} lg={14}>
          {quoteDetailsElement}
        </Col> 
        <Col xs={24} lg={10}>
          {relatedQuotesElement}
        </Col>
      </Row>
    </Content>
  );
}