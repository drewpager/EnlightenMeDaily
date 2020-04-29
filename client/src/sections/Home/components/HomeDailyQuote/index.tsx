import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUOTES } from '../../../../lib/graphql/queries/Quotes';
import { Quotes as QuotesData, QuotesVariables } from '../../../../lib/graphql/queries/Quotes/__generated__/Quotes';
import { QuoteFilter } from '../../../../lib/graphql/globalTypes';
import { Quote } from '../../../../lib/graphql/queries/Quote/__generated__/Quote';
import { Typography, Layout, Spin } from 'antd';

const { Title } = Typography;
const { Content } = Layout;

export const HomeDailyQuote = () => {
  const [DailyQuote, setDailyQuote] = useState();
  const { error, loading, data } = useQuery<QuotesData, QuotesVariables>(QUOTES, {
    variables: {
      category: "leadership, life, motivation",
      filter: QuoteFilter.MOST_RECENT,
      limit: 365,
      page: 1,
    }
  });

  if (data && data.quotes) {
    const count = data.quotes.total;
    const initTime: Date = new Date();
    const localTime: number = initTime.getTimezoneOffset() * 60000;
    const intNow: number = initTime.getTime() - localTime;
    const intDay: number = Math.floor(intNow / 86400000);
    const quoteIndex: number = intDay % count;

    if (quoteIndex < count) {
      const quote: any = data.quotes.result;
      setDailyQuote(quote[quoteIndex].quote);
    }
  }

  if (loading) {
    return <h3>Loading...</h3>
  }

  if (error) {
    return null;
  }

  return (
    <Content>
      <Title level={3}>Quote of the Day for {new Date().getMonth() + 1}/{new Date().getDate()}</Title>
      <h3>{DailyQuote}</h3>
    </Content>
  );
}