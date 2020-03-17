import { Collection, ObjectId } from 'mongodb';

export enum QuoteType {
  Quote = "QUOTE",
  Passage = "PASSAGE" 
}
export interface Quote {
  _id: ObjectId;
  quote: String;
  author: String;
  category: String;
  period: Number;
  image: String;
  type: QuoteType;
}

export interface User {
  _id: string;
  token: string;
  name: string;
  avatar: string;
  contact: string;
  bookmarkings: ObjectId[];
  quotes: ObjectId[];
  authorized?: boolean;
}

export interface Viewer {
  _id?: string;
  token?: string;
  avatar?: string;
  didRequest: boolean;
}

export interface Bookmarking {
  _id: ObjectId;
  quote: Quote;
  user: string;
}

export interface Database {
  bookmarkings: Collection<Bookmarking>;
  quotes: Collection<Quote>;
  users: Collection<User>;
}