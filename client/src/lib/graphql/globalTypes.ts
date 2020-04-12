/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum QuoteFilter {
  MOST_RECENT = "MOST_RECENT",
  OLDEST = "OLDEST",
}

export enum QuoteType {
  PASSAGE = "PASSAGE",
  QUOTE = "QUOTE",
}

export interface CreateQuoteInput {
  quote: string;
  author: string;
  category: string;
  period: string;
  image: string;
  type: QuoteType;
}

export interface LogInInput {
  code: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
