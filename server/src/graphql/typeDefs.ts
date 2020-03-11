import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Viewer {
    id: ID!
    token: String!
    avatar: String!
    didRequest: Boolean!
  }
  input LogInInput {
    code: String!
  }
  type Query {
    # quotes: [Quote!]!
    authUrl: String!
  }
  type Mutation {
    # deleteQuote(id: ID!): Quote!
    logIn(input: LogInInput): Viewer!
    logOut: Viewer!
  }
`;