import { IResolvers } from 'apollo-server-express';
import { ObjectId } from 'mongodb';
import { Request } from 'express';
import { Database, Quote, User, QuoteType } from '../../../lib/type';
import { QuoteArgs, QuotesArgs, QuotesData, CreateQuoteArgs, CreateQuoteInput } from './types';
import { authorize } from '../../../lib/utils';

const verifyCreateQuoteInput = ({ quote, author, type }: CreateQuoteInput) => {
  if (quote.length < 50) {
    throw new Error('Quote must be greater than 50 characters');
  }
  if (author.length < 3) {
    throw new Error('Author name must be longer than 3 characters');
  }
  if (type !== QuoteType.Passage && type !== QuoteType.Quote) {
    throw new Error('Type must be "QUOTE" or "PASSAGE"');
  }
}
export const quoteResolvers: IResolvers = {
  Query: {
    quotes: async (
      _root: undefined,
      { category, filter, limit, page }: QuotesArgs,
      { db }: { db: Database }
    ): Promise<QuotesData> => {
      //category here is the users search query
      category;
      try {
        const data: QuotesData = {
          total: 0,
          result: []
        }
      
        let cursor = await db.quotes.find({ $text: { $search: `${category}` }});
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
        if (viewer && viewer._id) {
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
    // reporter: async (
    //  quote: Quote,
    //  _args: {},
    //  { db }: { db: Database }
    // ): Promise<User> => {
    //   const reporter = await db.users.findOne({ _id: quote.reporter });
    //   if (!reporter) {
    //     throw new Error(`Failed to find reporter`);
    //   }
    //   return reporter;
    // }
  },
  Mutation: {
    createQuote: async (
      _root: undefined,
      { input }: CreateQuoteArgs,
      { db, req }: { db: Database, req: Request }
    ): Promise<Quote> => {
      verifyCreateQuoteInput(input);
      let viewer = await authorize(db, req);
      if (!viewer) {
        throw new Error('Viewer not found. Please log in!');
      }

      const insertResult = await db.quotes.insertOne({
        _id: new ObjectId(),
        ...input
      })

      const insertedQuote: Quote = insertResult.ops[0];

      await db.users.updateOne(
        { _id: viewer._id },
        { $push: { quotes: insertedQuote._id }}
      );
      
      return insertedQuote;
    }
  }
}