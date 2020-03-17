import { Request } from 'express';
import { IResolvers } from 'apollo-server-express';
import { 
  UserArgs, 
  UserBookmarkingsArgs, 
  UserBookmarkingsData,
  UserQuotesArgs,
  UserQuotesData 
} from './types';
import { authorize } from '../../../lib/utils/index';
import { Database, User } from '../../../lib/type';

export const userResolvers: IResolvers = {
  Query: {
    user: async (
      _root: undefined, 
      { id }: UserArgs, 
      { db, req }: { db: Database, req: Request }
    ): Promise<User> => {
      try {
        const user = await db.users.findOne({ _id: id })

        if (!user) {
          throw new Error('User does not exist');
        }

        const viewer = await authorize(db, req);
        
        if (viewer && viewer._id === user._id) {
          user.authorized = true;
        }

        return user;
      } catch (error) {
        throw new Error(`Failed to query user: ${error}`);
      }
    }
  },
  User: {
    id: (user: User): string => {
      return user._id;
    },
    bookmarkings: async (
      user: User, 
      {limit, page}: UserBookmarkingsArgs,
      { db }: { db: Database }
    ): Promise<UserBookmarkingsData | null> => {
      try {
        if (!user.authorized) {
          return null;
        }
        let data: UserBookmarkingsData = {
          total: 0,
          result: []
        }

        let cursor = await db.bookmarkings.find({ 
          _id: { $in: user.bookmarkings }
        })

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);

        data.total = await cursor.count();
        data.result = await cursor.toArray();

        return data;
      } catch (error) {
        throw new Error(`Failed to load bookmarks: ${error}`)
      }
    },
    quotes: async (
      user: User, 
      {limit, page}: UserQuotesArgs,
      { db }: { db: Database }
    ): Promise<UserQuotesData | null> => {
      try {
        let data: UserQuotesData = {
          total: 0,
          result: []
        }

        let cursor = await db.quotes.find({
          _id: { $in: user.quotes }
        })

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0)
        cursor = cursor.limit(limit);

        data.total = await cursor.count();
        data.result = await cursor.toArray();

        return data;
      } catch (error) {
        throw new Error(`Failed to query the user's quotes: ${error}`);
      }
    }
  }
}