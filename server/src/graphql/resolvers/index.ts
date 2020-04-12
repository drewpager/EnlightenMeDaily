import merge from 'lodash.merge';
import { viewerResolvers } from './Viewer';
import { userResolvers } from './User';
<<<<<<< HEAD

export const resolvers = merge(viewerResolvers, userResolvers);
=======
import { quoteResolvers } from './Quote';
import { bookmarkResolvers } from './Bookmark';

export const resolvers = merge(viewerResolvers, userResolvers, quoteResolvers, bookmarkResolvers);
>>>>>>> 27632080de61ae9356be3d8ecfb1d200428abe23
