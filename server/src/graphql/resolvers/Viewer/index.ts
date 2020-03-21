import { IResolvers } from 'apollo-server-express';
import { Request, Response } from 'express';
import { Viewer, Database, User } from '../../../lib/type';
import { LogInArgs } from './types';
import { Google } from '../../../lib/api/Google';
import crypto from 'crypto';

const cookieOptions = {
  httpOnly: true,
  sameSite: true,
  signed: true,
  secure: process.env.NODE_ENV === "development" ? false : true
}

const logInViaCookie = async (
  token: string,
  db: Database,
  req: Request,
  res: Response
): Promise<User | undefined> => {
  const updateRes = await db.users.findOneAndUpdate(
    { _id: req.signedCookies.viewer },
    { $set: { token }},
    { returnOriginal: false }
  );

  let viewer = updateRes.value;

  if (!viewer) {
    res.clearCookie("viewer", cookieOptions);
  }

  return viewer;
};

const LogInViaGoogle = async (
  code: string, 
  token: string, 
  db: Database,
  res: Response
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

  if (!userNames || !userId || !userAvatar || !userEmail) {
    throw new Error('Google login error');
  }

  const updateRes = await db.users.findOneAndUpdate(
    { _id: userId }, 
    { 
      $set: {
        name: userNames,
        avatar: userAvatar,
        contact: userEmail,
        token
      }
    },
    { returnOriginal: false }
  );

  let viewer = updateRes.value;

  if (!viewer) {
    const insertResult = await db.users.insertOne({
      _id: userId,
      token,
      name: userNames,
      avatar: userAvatar,
      contact: userEmail,
      bookmarkings: [],
      quotes: []
    });
    
    viewer = insertResult.ops[0];
  }
  res.cookie("viewer", userId, {
    ...cookieOptions,
    maxAge: 365 * 24 * 60 * 60 * 1000
  });

  return viewer;
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
      { db, req, res }: { db: Database, req: Request, res: Response } 
    ): Promise<Viewer> => {
      try {
        const code = input ? input.code : null;
        const token = crypto.randomBytes(16).toString("hex");
        const viewer: User | undefined = code 
          ? await LogInViaGoogle(code, token, db, res)
          : await logInViaCookie(token, db, req, res);
          
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
    logOut: (
      _root: undefined,
      _args: {},
      { res }: { res: Response }
    ) => {
      try {
        res.clearCookie("viewer", cookieOptions);
        return { didRequest: true };
      } catch (error) {
        throw new Error(`failed to log out of Google: ${error}`);
      }
    }
  },
  Viewer: {
    id: (viewer: Viewer): string | undefined => {
      return viewer._id;
    }
  }
};
