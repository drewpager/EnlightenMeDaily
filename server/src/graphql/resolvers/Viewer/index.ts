import { IResolvers } from 'apollo-server-express';
import { Viewer, Database, User } from '../../../lib/type';
import { LogInArgs } from './types';
import { Google } from '../../../lib/api';
import crypto from 'crypto';

const LogInViaGoogle = (
  code: string, 
  token: string, 
  db: Database
): Promise<User | undefined> => {
  const { user } = await Google.logIn(code);

  if (!user) {
    throw new Error(`Failed to log in with Google`);
  }

  const userNamesList = user.names && user.names.length ? user.names : null;
  const userPhotosList = user.photos && user.photos.length ? user.photos : null;
  const userEmailList = user.emailAddresses && user.emailAddresses.length ? user.emailAddresses : null;

  const userNames = userNamesList ? userNamesList[0].displayName : null;
  const userId = userNamesList && userNamesList[0].metadata && userNamesList[0].metadata.source 
    ? userNamesList[0].metadata.source.id 
    : null;
  const userAvatar = userPhotosList && userPhotosList[0].url ? userPhotosList[0].url : null;
  const userEmail = userEmailList && userEmailList[0].value ? userEmailList[0].value : null;
}

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
