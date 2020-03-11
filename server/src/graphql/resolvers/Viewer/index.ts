import { IResolvers } from 'apollo-server-express';
import { Viewer, Database, User } from '../../../lib/type';
import { LogInArgs } from './types';
import { Google } from '../../../lib/api';
import crypto from 'crypto';

export const viewerResolvers: IResolvers = {
  Query: {
    authUrl: (): string => {
      try {
        return Google.authUrl;
      } catch (error) {
        throw new Error(`failed to query Google auth url: ${error}`);
      }
    }
  },
  Mutation: {
    logIn: async (
      _root: undefined, 
      { input }: LogInArgs, 
      { db }: { db: Database } 
    ): Promise<Viewer> => {
      try {
        const code = input ? input.code : null;
        const token = crypto.randomBytes(16).toString("hex");
        const viewer: User | undefined = code 
          ? await LogInViaGoogle(code, token, db)
          : undefined;
          
        if (!viewer) {
          return { didRequest: true };
        }

        return {
          _id: viewer._id,
          token: viewer.token,
          avatar: viewer.avatar,
          didRequest: true
        }
      } catch (error) {
        throw new Error(`Failed to log in: ${error}`);
      }
    },
    logOut: () => {
      return 'Mutation.logOut'
    }
  },
  Viewer: {
    id: (viewer: Viewer): string | undefined => {
      return viewer._id;
    }
  }
};
