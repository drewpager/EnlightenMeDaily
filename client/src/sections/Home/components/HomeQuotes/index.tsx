import React from 'react';
import { List, Typography } from 'antd';
import { QuoteCard } from '../../../../lib/components/QuoteCard';
import { Quotes } from '../../../../lib/graphql/queries/Quotes/__generated__/Quotes';

interface Props {
  title: string;
  quotes: Quotes["quotes"]["result"];
}

const { Title } = Typography;

export const HomeQuotes = ({ title, quotes }: Props) => {
  return (
    <div className="home-quotes">
      <Title level={4} className="home-quotes__title">
        {title}
      </Title>
      <List 
        grid={{
          gutter: 8,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 2
        }}
        dataSource={quotes}
        renderItem={quote => (
          <List.Item>
            <QuoteCard quotes={quote} />
          </List.Item>
        )}
      />
    </div>
  )
}