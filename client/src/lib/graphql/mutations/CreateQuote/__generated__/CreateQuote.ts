/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreateQuoteInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: CreateQuote
// ====================================================

export interface CreateQuote_createQuote {
  __typename: "Quote";
  id: string;
}

export interface CreateQuote {
  createQuote: CreateQuote_createQuote;
}

export interface CreateQuoteVariables {
  input: CreateQuoteInput;
}
