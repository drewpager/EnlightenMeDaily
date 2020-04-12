import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Typography, Tag } from 'antd';

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

const { Text, Paragraph } = Typography;

export const QuoteCard = ({ quotes }: Props) => {
  const { id, quote, author, category, period, image } = quotes;

  return (
      <Link to={`/quote/${id}`}>
      <Card 
        className="quote-card"
        hoverable 
        cover={
          <div 
            style={{ backgroundImage: `url(${image})`}} className="quote-card__cover-img"
          />
        }>
        <div className="quote-card__description">
          <Paragraph className="quote-card__quote quote-card__quote-open">
            {quote}
          </Paragraph>
          <Text strong ellipsis className="quote-card__title">
            {author}
          </Text>
          <Text strong ellipsis className="quote-card__address">
            {/* Time period: {period} */}
          </Text>
          <div className="quote-details__about-items">
            <Tag color={category.includes("leadership") ? "magenta" : "blue"}>{category}</Tag>
          </div>
        </div>
      </Card>
    </Link>
  )
}