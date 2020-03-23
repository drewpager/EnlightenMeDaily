import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Typography } from 'antd';

interface Props {
  quotes: {
    id: string,
    quote: string,
    author: string,
    category: string,
    period: number,
    image: string
  }
}

const { Title, Text, Paragraph } = Typography;

export const QuoteCard = ({ quotes }: Props) => {
  const { id, quote, author, category, period, image } = quotes;

  return (
    <Link to={`/quote/${id}`}>
      <Card hoverable cover={<div style={{ backgroundImage: `url(${image})`}} className="quote-card__cover-img"></div>}>
        <div className="quote-card__description">
          <Paragraph className="quote-card__quote">
            "{quote}"
          </Paragraph>
          <Text strong ellipsis className="quote-card__title">
            {author}
          </Text>
          <Text strong ellipsis className="quote-card__address">
            Time period: {period}
          </Text>
          <div className="quote-card__dimensions quote-card__dimensions--guests">
            <Text>{category}</Text>
          </div>
        </div>
      </Card>
    </Link>
  )
}