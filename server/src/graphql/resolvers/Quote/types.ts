import { Quote } from '../../../lib/type';
export interface QuoteArgs {
  id: string;
}

export enum QuoteFilter {
  OLDEST = "OLDEST",
  MOST_RECENT = "MOST_RECENT"
}

export interface QuotesArgs {
  filter: QuoteFilter;
  limit: number;
  page: number;
}

export interface QuotesData {
  total: number;
  result: Quote[];
}