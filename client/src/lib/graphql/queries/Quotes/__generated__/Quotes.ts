/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { QuoteFilter } from "./../../../globalTypes";

// ====================================================
// GraphQL query operation: Quotes
// ====================================================

export interface Quotes_quotes_result {
  __typename: "Quote";
  id: string;
  quote: string;
  author: string;
  category: string;
  period: number;
  image: string;
}

export interface Quotes_quotes {
  __typename: "Quotes";
  result: Quotes_quotes_result[];
}

export interface Quotes {
  quotes: Quotes_quotes;
}

export interface QuotesVariables {
  category?: string | null;
  filter: QuoteFilter;
  limit: number;
  page: number;
}
