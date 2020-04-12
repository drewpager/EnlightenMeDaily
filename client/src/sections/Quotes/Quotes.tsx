import React from 'react';
import "./styles/Quotes.css";
import { List, Avatar, Button, Spin, Alert, Layout } from 'antd';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Quotes as QuotesData } from './__generated__/Quotes';
import { DeleteQuote as DeleteQuoteData, DeleteQuoteVariables } from './__generated__/DeleteQuote';
import { QuotesSkeleton } from './components/QuotesSkeleton';

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
      <div className="quotes">
        <QuotesSkeleton title={title}/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quotes">
        <QuotesSkeleton title={title} error />
      </div>
    )
  }
  
  const quotes = data ? data.quotes : null;

  const deleteQuoteErrorAlert = deleteQuoteError ? (
    <Alert 
      type="error"
      message="Uh oh! Something went wrong in the deletion process. Please try again!"
    />
  ) : null;

  const quotesList = quotes ? (
        <List 
          itemLayout="horizontal"
          dataSource={quotes}
          renderItem={quote => (
            <List.Item
              actions={[
                <Button type="ghost" onClick={() => handleDeleteQuote(quote.id)}>
                  Delete
                </Button>
              ]}
            >
              <List.Item.Meta 
                title={quote.quote}
                description={quote.author}
                avatar={<Avatar src={quote.image} size={48} />}
              />
            </List.Item>
          )}
        />
  ) : null;
  return (
    <div className="quotes">
      <Spin spinning={deleteQuoteLoading}>
        <h2>{title}</h2>
        {quotesList}
        {deleteQuoteErrorAlert}
      </Spin>
    </div>
  );
}