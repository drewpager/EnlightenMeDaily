import { IResolvers } from 'apollo-server-express';
// import { Quote } from '../../../lib/type';

export const bookmarkResolvers: IResolvers = {
  Mutation: {
    createBookmark: () => {
      return "Mutation.CreateBookmark";
    }
  }
}