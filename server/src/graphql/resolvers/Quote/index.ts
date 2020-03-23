import { IResolvers } from 'apollo-server-express';
import { ObjectId } from 'mongodb';
import { Request } from 'express';
import { Database, Quote, User } from '../../../lib/type';
import { QuoteArgs, QuotesArgs, QuotesData } from './types';
import { authorize } from '../../../lib/utils';

export const quoteResolvers: IResolvers = {
  Query: {
    quotes: async (
      _root: undefined,
      { category, filter, limit, page }: QuotesArgs,
      { db }: { db: Database }
    ): Promise<QuotesData> => {
      const query: string = "";
      try {
        const data: QuotesData = {
          total: 0,
          result: []
        }
        //playing around with if statement for user searching category
        // remove if else blocks 
        
        if (query === category) {
          let cursor = await db.quotes.find({query});
          if (filter && filter === "OLDEST") {
            cursor = cursor.sort({ period: -1 });
          }
  
          if (filter && filter === "MOST_RECENT") {
            cursor = cursor.sort({ period: 1 });
          }
  
          cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
          cursor = cursor.limit(limit);
  
          data.total = await cursor.count();
          data.result = await cursor.toArray();
  
          return data;
        } else {
          let cursor = await db.quotes.find({});

          if (filter && filter === "OLDEST") {
            cursor = cursor.sort({ period: -1 });
          }
  
          if (filter && filter === "MOST_RECENT") {
            cursor = cursor.sort({ period: 1 });
          }
  
          cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
          cursor = cursor.limit(limit);
  
          data.total = await cursor.count();
          data.result = await cursor.toArray();
  
          return data;
        }
      } catch (error) {
        throw new Error(`Failed to query quotes: ${error}`);
      }
    },
    quote: async (
      _root: undefined,
      { id }: QuoteArgs,
      { db, req }: { db: Database, req: Request }
    ): Promise<Quote> => {
      try {
        const quote = await db.quotes.findOne({ _id: new ObjectId(id) });
        if (!quote) {
          throw new Error("Quote was not found.")
        }

        // author may be string and therefore not equal to an ID. 
        // possibly remove this
        const viewer = await authorize(db, req);
        if (viewer && viewer._id === quote.reporter) {
          quote.authorized = true;
        }

        return quote;
      } catch (error) {
        throw new Error(`Failed to find quote: ${error}`);
      }
    }
  },
  Quote: {
    id: (quote: Quote): string => {
      return quote._id.toHexString();
    },
    reporter: async (
     quote: Quote,
     _args: {},
     { db }: { db: Database }
    ): Promise<User> => {
      const reporter = await db.users.findOne({ _id: quote.reporter });
      if (!reporter) {
        throw new Error(`Failed to find reporter`);
      }
      return reporter;
    }
  }
}