import { gql } from 'apollo-boost';

export const QUOTES = gql`
  query Quotes($category: String, $filter: QuoteFilter!, $limit: Int!, $page: Int!) {
    quotes(category: $category, filter: $filter, limit: $limit, page: $page) {
      result {
        id
        quote
        author
        category
        period
        image
      }
    }
  }
`;