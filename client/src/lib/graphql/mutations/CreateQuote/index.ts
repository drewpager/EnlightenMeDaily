import { gql } from 'apollo-boost';

export const CREATE_QUOTE = gql`
  mutation CreateQuote($input: CreateQuoteInput!) {
    createQuote(input: $input) {
      id
    }
  }
`;