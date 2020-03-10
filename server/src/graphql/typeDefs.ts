import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    # quotes: [Quote!]!
    authUrl: String!
  },
  type Mutation {
    # deleteQuote(id: ID!): Quote!
    logIn: String!
    logOut: String!
  }
`;