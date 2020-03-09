import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Quotes as QuotesData } from './__generated__/Quotes';
import { DeleteQuote as DeleteQuoteData, DeleteQuoteVariables } from './__generated__/DeleteQuote';

const QUOTES = gql`
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

const DELETE_QUOTE = gql`
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
  const { data, refetch, loading, error } = useQuery<QuotesData>(QUOTES);

  const [
    deleteQuote, 
    { loading: deleteQuoteLoading, error: deleteQuoteError }
  ] = useMutation<DeleteQuoteData, DeleteQuoteVariables>(DELETE_QUOTE);

  const handleDeleteQuote = async (id: string) => {
    await deleteQuote({ variables: { id }});
    refetch();
  }

  if (loading) {
    return (
      <div>
        <h2>{title}</h2>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return <h2>Uh oh! Something went wrong</h2>;
  }
  
  const quotes = data ? data.quotes : null;

  const deleteQuoteLoadingElement = deleteQuoteLoading ? (
    <h4>Deletion in progress...</h4>
    ) : null;

  const deleteQuoteErrorElement = deleteQuoteError ? (
    <h4>Uh Oh! Failed to delete item. Please try again!</h4>
  ) : null;

  const quotesList = quotes ? (
    <ul>
      {quotes.map(quote => {
        return (
        <li key={quote.id}>{quote.quote}{" "}
          <button onClick={() => handleDeleteQuote(quote.id)}>Delete</button>
        </li>
        );
      })}
    </ul>
  ) : null;
  return (
    <div>
      <h2>{title}</h2>
      {quotesList}
      {deleteQuoteLoadingElement}
      {deleteQuoteErrorElement}
    </div>
  );
}