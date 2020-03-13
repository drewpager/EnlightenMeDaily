"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = apollo_server_express_1.gql `
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
