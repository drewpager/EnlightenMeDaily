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

const initialQuote = {
  quote: "Leadership is not about a title or a designation. It's about impact, influence and inspiration. Impact involves getting results, influence is about spreading the passion you have for your work, and you have to inspire teammates and customers.",
  author: 'Robin S. Sharma',
  id: '5e91f357e50e513beb89fc27'
}

export const HomeDailyQuote = () => {
  const [DailyQuote, setDailyQuote] = useState<QuoteProps>(initialQuote);
  const { error, loading, data } = useQuery<QuotesData, QuotesVariables>(QUOTES, {
    variables: {
      category: "leadership, life, motivation",
      filter: QuoteFilter.MOST_RECENT,
      limit: 365,
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
      if (random > -1 && random < 366) { continue; }
      const initTime: Date = new Date();
      const localTime: number = initTime.getTimezoneOffset() * 60000;
      const intNow: number = initTime.getTime() - localTime;
      const intDay: number = Math.floor(intNow / 86400000);
      const quoteIndex: number = intDay % random;

      console.log('QuoteIndex: ', quoteIndex);
      
      if (quoteIndex && quoteIndex >= 0) {
        const { quote, author, id } = data.quotes.result[0];
        // let quote = data.quotes.result[0].quote;
        // let author = data.quotes.result[0].author;
        // let id = data.quotes.result[0].id;
        console.log({quote, author, id});
        setDailyQuote({quote, author, id});
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
        <div>
          <div className="daily-quote__title">
            <h1>Quote of the Day for <span className="date-title">{new Date().getMonth() + 1}/{new Date().getDate()}</span></h1>
          </div>
          <div className="daily-quote">
            <h3>{DailyQuote.quote}</h3>
            <h4>– {DailyQuote.author}</h4>
            {/* <Link to={`/quote/${DailyQuote.id}`}>Read More</Link> */}
          </div>
        </div>
      );
    };
  }
  return null;
};

