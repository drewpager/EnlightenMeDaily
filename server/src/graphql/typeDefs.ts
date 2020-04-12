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

<<<<<<< HEAD
=======
  enum QuoteFilter {
    OLDEST
    MOST_RECENT
  }

  input CreateQuoteInput {
    quote: String!
    author: String!
    category: String!
    period: String!
    image: String!
    type: QuoteType!
  }

>>>>>>> 27632080de61ae9356be3d8ecfb1d200428abe23
  type Quotes {
    total: Int!
    result: [Quote!]!
  }

  type Quote {
    id: ID!
    quote: String!
<<<<<<< HEAD
    author: User!
=======
    author: String!
>>>>>>> 27632080de61ae9356be3d8ecfb1d200428abe23
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
<<<<<<< HEAD
=======
    quotes(category: String, filter: QuoteFilter!, limit: Int!, page: Int!): Quotes!
>>>>>>> 27632080de61ae9356be3d8ecfb1d200428abe23
  }

  type Mutation {
    # deleteQuote(id: ID!): Quote!
    logIn(input: LogInInput): Viewer!
    logOut: Viewer!
    createQuote(input: CreateQuoteInput!): Quote!
    createBookmark: String!
  }
`;