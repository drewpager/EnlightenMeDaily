import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Divider, Tag, Typography } from 'antd';
// import Icon from '@ant-design/icons';
import { Quote as QuoteData } from '../../../../lib/graphql/queries/Quote/__generated__/Quote';

interface Props {
  quoteData: QuoteData["quote"];
}

const { Paragraph, Title } = Typography;

export const QuoteDetails = ({ quoteData }: Props) => {
  const { quote, author, category, period, image, type } = quoteData;

  return (
    <div className="quote-details">
      <div 
        style={{ backgroundImage: `url(${image}` }}
        className="quote-details__image"
      />
      <div className="quote-details__information">
        <Title level={3} className="quote-details__title">
          {quote}
          <Divider type="horizontal" />
          {author}
        </Title>
      </div>

      <Divider />

      <div className="quote-details__section">
        <Avatar src={image} size={64} />
          <Title level={2} className="quote-details__host-name">
            {author}
          </Title>
      </div>

      <Divider />

      <div className="quote-details__section">
        <Title level={4}>
          Quote Categories
        </Title>
        <div className="quote-details__about-items">
          <Tag color="magenta">{category}</Tag>
          <Tag color="magenta">{type}</Tag>
        </div>
      </div>
    </div>
  )
}