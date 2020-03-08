import { IResolvers } from 'apollo-server-express';
import { ObjectId } from 'mongodb';
import { Database, Quote } from '../../../lib/type';

export const quoteResolvers: IResolvers = {
  Query: {
    quotes: async (
      _root: undefined, 
      _args: {}, 
      { db }: { db: Database }
    ): Promise<Quote[]> => { 
      return await db.quotes.find({}).toArray();  
    }
  },
  Mutation: {
    deleteQuote: async (
      _root: undefined, 
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Quote> => {
     const deleteRes = await db.quotes.findOneAndDelete({
       _id: new ObjectId(id) 
      });

      if (!deleteRes.value) {
        throw new Error(`Failed to delete quote!`)
      }

      return deleteRes.value;
    }
  },
  Quote: {
    id: (quote: Quote): string => quote._id.toString()
  }
}