import { Collection, ObjectId } from 'mongodb';

export interface Quote {
  _id: ObjectId;
  quote: String;
  author: String;
  category: String;
  period: Number;
  image: String;
}

export interface Database {
  quotes: Collection<Quote>;
}