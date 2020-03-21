import merge from 'lodash.merge';
import { viewerResolvers } from './Viewer';
import { userResolvers } from './User';
import { quoteResolvers } from './Quote';

export const resolvers = merge(viewerResolvers, userResolvers, quoteResolvers);