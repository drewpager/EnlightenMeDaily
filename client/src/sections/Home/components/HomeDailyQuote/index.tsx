import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUOTES } from '../../../../lib/graphql/queries/Quotes';
import { Quotes as QuotesData, QuotesVariables } from '../../../../lib/graphql/queries/Quotes/__generated__/Quotes';
import { QuoteFilter } from '../../../../lib/graphql/globalTypes';
// import { Quote } from '../../../../lib/graphql/queries/Quote/__generated__/Quote';
import { Typography, Layout, Spin } from 'antd';

const { Title } = Typography;
const { Content } = Layout;

interface QuoteProps {
  quote: string;
  author: string;
  id: string;
}

export const HomeDailyQuote: any = () => {
  const [DailyQuote, setDailyQuote] = useState<QuoteProps>();
  const { error, loading, data } = useQuery<QuotesData, QuotesVariables>(QUOTES, {
    variables: {
      category: "leadership, life, motivation",
      filter: QuoteFilter.MOST_RECENT,
      limit: 1,
      page: 1,
    }
  })

  if (data && data.quotes) {
    const getRandomNumber = (min: number, max: number) => {
      const step1 = max - min + 1;
      const step2 = Math.random() * step1;
      const result = Math.floor(step2) + min;
      return result;
    }
    let item;
    
    for (item in data.quotes) {
      const count: number = data.quotes.total;
      const random: number = getRandomNumber(0, count + 1);
      const initTime: Date = new Date();
      const localTime: number = initTime.getTimezoneOffset() * 60000;
      const intNow: number = initTime.getTime() - localTime;
      const intDay: number = Math.floor(intNow / 86400000);
      const quoteIndex: number = intDay % random;

      console.log('QuoteIndex: ', quoteIndex);
      
      if (quoteIndex && quoteIndex >= 0) {
        let quote = data.quotes.result[quoteIndex].quote;
        let author = data.quotes.result[quoteIndex].author;
        let id = data.quotes.result[quoteIndex].id;
        console.log({quote, author, id});
        setDailyQuote({quote, author, id});
        // return;
      }
    }

    if (loading) {
      return <Spin size="small" tip="loading quote of the day" />;
    }
  
    if (error) {
      throw new Error("Failed to find Quote of the Day.");
    }
  
    if (DailyQuote && DailyQuote.quote) {
      return (
        <Content>
          <Title level={3}>Quote of the Day for {new Date().getMonth() + 1}/{new Date().getDate()}</Title>
          <h3>{DailyQuote.quote}</h3>
          <h4>{DailyQuote.author}</h4>
          <Link to={`/quote/${DailyQuote.id}`}>Read More</Link>
        </Content>
      );
    };
  }
  return null;
};

