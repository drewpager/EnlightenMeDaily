import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { Card, Typography, Divider, Spin, List, Avatar } from 'antd';
import { Quote as QuoteData } from '../../../../lib/graphql/queries/Quote/__generated__/Quote';
import { QUOTES } from '../../../../lib/graphql/queries/Quotes';
import { Quotes as QuotesData, QuotesVariables } from '../../../../lib/graphql/queries/Quotes/__generated__/Quotes';
import { QuoteFilter } from '../../../../lib/graphql/globalTypes';

interface Props {
  categoryData: QuoteData["quote"]["category"];
}

const { Title, Paragraph } = Typography;

const PAGE_LIMIT = 3;

export const RelatedQuotes = ({ categoryData }: Props) => {
  const cat: string = categoryData;

  const { loading, error, data } = useQuery<QuotesData, QuotesVariables>(QUOTES, {
    variables: {
      category: cat,
      filter: QuoteFilter.OLDEST,
      limit: PAGE_LIMIT,
      page: 1
    }
  })

  if (loading) {
    return (
      <Spin 
        size="small"
        tip="loading related quotes"
      />
    )
  }

  if (error) {
    return (
      <p>Failed to load.</p>
    )
  }

  const quotes = data && data.quotes && data.quotes.result ? data.quotes.result : undefined;

  return (
    <div className="quote-booking">
      <Card className="quote-booking__card">
        <div>
          <Paragraph>
            <Title level={2} className="quote-booking__card-title">Related Authors</Title>
          </Paragraph>
          <Divider />
          <List 
            itemLayout="horizontal"
            dataSource={quotes}
            renderItem={quote => (
              <List.Item>
                <Avatar src={`${quote.image}`} />
                <Link to={`/quote/${quote.id}`}>{quote.author}</Link>
              </List.Item>
            )}
          />
        </div>
      </Card>
    </div>
  )
}