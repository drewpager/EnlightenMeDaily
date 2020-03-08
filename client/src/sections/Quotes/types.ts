export interface Quote {
  id: string;
  quote: string;
  author: string;
  category: string;
  period: number;
  image: string
}

export type QuotesData = {
  quotes: Quote[];
}

export interface DeleteQuoteData {
  deleteQuote: Quote;
}

export interface DeleteQuoteVariables {
  id: string;
}