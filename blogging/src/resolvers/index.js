import Query from './Query';
import Mutation from './Mutation';
import Comment from './Comment';
import User from './User';
import Post from './Post';
import Subscription from './Subscription';
import {extractFragmentReplacements} from "graphql-middleware/dist/fragments";

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Comment,
  User,
  Post,
};

export const fragmentReplacements = extractFragmentReplacements(resolvers);

export default resolvers;