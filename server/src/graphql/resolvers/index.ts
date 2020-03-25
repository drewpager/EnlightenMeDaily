import merge from 'lodash.merge';
import { viewerResolvers } from './Viewer';
import { userResolvers } from './User';
import { quoteResolvers } from './Quote';
import { bookmarkResolvers } from './Bookmark';

export const resolvers = merge(viewerResolvers, userResolvers, quoteResolvers, bookmarkResolvers);