/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { QuoteType } from "./../../../globalTypes";

// ====================================================
// GraphQL query operation: Quote
// ====================================================

export interface Quote_quote {
  __typename: "Quote";
  id: string;
  quote: string;
  author: string;
  period: number;
  image: string;
  category: string;
  type: QuoteType;
}

export interface Quote {
  quote: Quote_quote;
}

export interface QuoteVariables {
  id: string;
}
