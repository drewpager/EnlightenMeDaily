import { IResolvers } from 'apollo-server-express';
import { quotes } from '../quotes';

export const resolvers: IResolvers = {
  Query: {
    quotes: () => { 
      return quotes 
    }
  },
  Mutation: {
    deleteQuote: (_root: undefined, { id }: { id: string }) => {
      for (let i = 0; i < quotes.length; i++) {
        if (quotes[i].id === id) {
          return quotes.splice(i, 1)[0];
        }
      }
      throw new Error('Failed to delete quote!')
    }
  }
}