import React, { useState } from 'react';
import { server } from '../../lib/api';
import { 
  QuotesData, 
  Quote,
  DeleteQuoteData, 
  DeleteQuoteVariables 
} from './types';

const QUOTES = `
  query Quotes {
    quotes {
      id
      quote
      author
      category
      period
      image
    }
  }
`;

const DELETE_QUOTE = `
  mutation DeleteQuote($id: ID!) {
    deleteQuote(id: $id) {
      id
    }
  }
`;

interface Props {
  title: string;
}

export const Quotes = ({ title }: Props) => {
  const [quotes, setQuote] = useState<Quote[] | null>(null);
  const fetchQuotes = async () => {
    const { data } = await server.fetch<QuotesData>({ query: QUOTES });
    setQuote(data.quotes);
  }

  const deleteQuote = async (id: string) => {
    const { data } = await server.fetch<DeleteQuoteData, DeleteQuoteVariables>({
      query: DELETE_QUOTE,
      variables: {
        id
      }
    });
    fetchQuotes();
  }

  const quotesList = quotes ? (
    <ul>
      {quotes.map(quote => {
        return (
        <li key={quote.id}>{quote.quote}{" "}
          <button onClick={() => deleteQuote(quote.id)}>Delete</button>
        </li>
        );
      })}
    </ul>
  ) : null;
  return (
    <div>
      <h2>{title}</h2>
      {quotesList}
      <button onClick={fetchQuotes}>Fetch Quotes!</button>
    </div>
  );
}