import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUOTES } from '../../../../lib/graphql/queries/Quotes';
import { Quotes as QuotesData, QuotesVariables } from '../../../../lib/graphql/queries/Quotes/__generated__/Quotes';
import { QuoteFilter } from '../../../../lib/graphql/globalTypes';
// import { Quote } from '../../../../lib/graphql/queries/Quote/__generated__/Quote';
import { Spin } from 'antd';

interface QuoteProps {
  quote: string;
  author: string;
  id: string;
}

const initialQuote = {
  quote: "My mother was in the Army Reserve for six years. She taught me the importance of following rules, finishing what I start, never giving up, leadership skills, teamwork, staying positive, motivated and how to pack the military way when I'm traveling!",
  author: 'Laurie Hernandez',
  id: '5ebbf5688c0bf43b28c601dd'
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

  function * generator(data: any) {
    for (const i in data) {
      const { quote, author, id } = data.quotes.result[i];
      console.log({quote, author, id});
      setDailyQuote({quote, author, id});
      yield i;
    }
  }

  // const randomQuote = (data: any) => {
  //   let r = Math.floor(Math.random() * 365);
  //   const i = r;
  //   function setQuote(r: number) {
  //     const { quote, author, id } = data.quotes.result[i];
  //     setDailyQuote({quote, author, id});
  //   }
  //   return setQuote(r);
  // }

  if (data && data.quotes) {
    generator(data);
    // randomQuote(data);
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
  return null;
};

