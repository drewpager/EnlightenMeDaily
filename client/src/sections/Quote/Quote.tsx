import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { RouteComponentProps } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';
import { PageSkeleton, ErrorBanner } from '../../lib/components/';
import { QUOTE } from '../../lib/graphql/queries';
import { Quote as QuoteData, QuoteVariables } from '../../lib/graphql/queries/Quote/__generated__/Quote';
import { QuoteDetails } from './components/';

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
  
  return (
    <Content className="quotes">
      <Row gutter={24} justify="space-between">
        <Col xs={24} lg={14}>
          {quoteDetailsElement}
        </Col> 
      </Row>
    </Content>
  );
}