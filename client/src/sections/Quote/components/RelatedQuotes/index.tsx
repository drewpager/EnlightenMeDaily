import React from 'react';
import { Card, Typography, Divider } from 'antd';

// interface Props {
//   quoteData: QuoteData["quote"]["category"];
// }

const { Title, Paragraph } = Typography;

export const RelatedQuotes = () => {
  return (
    <div className="quote-booking">
      <Card className="quote-booking__card">
        <div>
          <Paragraph>
            <Title level={2} className="quote-booking__card-title">Related Content</Title>
          </Paragraph>
          <Divider />
          <Paragraph>
            <ul>"Quote 1 lives here."</ul>
            <ul>"Quote 2 lives here."</ul>
            <ul>"Quote 3 lives here."</ul>
          </Paragraph>
        </div>
      </Card>
    </div>
  )
}