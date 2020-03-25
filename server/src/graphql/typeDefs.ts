import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Bookmark {
    id: ID!
    quote: Quote!
    user: User!
  }
  
  type Bookmarkings {
    total: Int!
    result: [Bookmark!]! 
  }

  enum QuoteType {
    QUOTE 
    PASSAGE
  }

  enum QuoteFilter {
    OLDEST
    MOST_RECENT
  }

  type Quotes {
    total: Int!
    result: [Quote!]!
  }

  type Quote {
    id: ID!
    quote: String!
    author: String!
    reporter: User!
    category: String!
    period: Int!
    image: String!
    type: QuoteType! 
  }

  type User {
    id: ID!
    name: String!
    avatar: String!
    contact: String!
    bookmarkings(limit: Int!, page: Int!): Bookmarkings
    quotes(limit: Int!, page: Int!): Quotes
  }
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
    quote(id: ID!): Quote!
    authUrl: String!
    user(id: ID!): User!
    quotes(category: String, filter: QuoteFilter!, limit: Int!, page: Int!): Quotes!
  }

  type Mutation {
    # deleteQuote(id: ID!): Quote!
    logIn(input: LogInInput): Viewer!
    logOut: Viewer!
    createBookmark: String!
  }
`;