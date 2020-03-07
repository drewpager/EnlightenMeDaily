import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Quote {
    id: ID!
    quote: String!
    author: String!
    category: String!
    period: Int!
    image: String!
  },
  type Query {
    quotes: [Quote!]!
  },
  type Mutation {
    deleteQuote(id: ID!): Quote!
  }
`;