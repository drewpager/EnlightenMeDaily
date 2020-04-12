import { Quote, QuoteType } from '../../../lib/type';
export interface QuoteArgs {
  id: string;
}

export enum QuoteFilter {
  OLDEST = "OLDEST",
  MOST_RECENT = "MOST_RECENT"
}

export interface QuotesArgs {
  category?: string;
  filter: QuoteFilter;
  limit: number;
  page: number;
}

export interface QuotesData {
  total: number;
  result: Quote[];
}

export interface CreateQuoteInput {
  quote: string;
  author: string;
  category: string;
  period: number;
  image: string;
  type: QuoteType;
}

export interface CreateQuoteArgs {
  input: CreateQuoteInput;
}