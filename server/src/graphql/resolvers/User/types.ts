import { Bookmarking, Quote } from "../../../lib/type";

export interface UserArgs {
  id: string;
}

export interface UserBookmarkingsArgs {
  limit: number;
  page: number;
}

export interface UserBookmarkingsData {
  total: number;
  result: Bookmarking[]
}

export interface UserQuotesArgs {
  limit: number;
  page: number;
}

export interface UserQuotesData {
  total: number;
  result: Quote[];
}