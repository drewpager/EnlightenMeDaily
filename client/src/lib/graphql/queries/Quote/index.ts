import { gql } from 'apollo-boost';

export const QUOTE = gql`
  query Quote($id: ID!) {
    quote(id: $id) {
      id 
      quote
      author
      period
      image
      category
      type
    }
  }
`;