import React from 'react';
import { Avatar, Divider, Tag, Typography, Button, Tooltip } from 'antd';
import { CopyOutlined, TwitterOutlined }  from '@ant-design/icons';
import { Quote as QuoteData } from '../../../../lib/graphql/queries/Quote/__generated__/Quote';
import { copyToClipboard } from '../../../../lib/utils';

interface Props {
  quoteData: QuoteData["quote"];
}

const { Title } = Typography;

export const QuoteDetails = ({ quoteData }: Props) => {
  const { quote, author, category, period, image, type } = quoteData;

  return (
    <div className="quote-details">
      <div 
        style={{ backgroundImage: `url(${image}` }}
        className="quote-details__image"
      />
      <div className="quote-details__information">
        <Title level={3} className="quote-details__quotation">
          {quote}
        </Title>
        <Tooltip placement="bottomRight" title="Copy quote to clipboard">
          <CopyOutlined className="quote-details__icon-copy" onClick={() => {copyToClipboard(quote)}}/>
        </Tooltip>
          {/* <TwitterOutlined className="quote-details__icon-twitter" /> */}
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
        </div>
      </div>
    </div>
  )
}