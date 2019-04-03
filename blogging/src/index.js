import { GraphQLServer, PubSub } from "graphql-yoga";
import db from './db';
import resolvers from './resolvers';
import typeDefs from './schema';
import prisma from './prisma';

const pubSub = new PubSub();
// create server
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context(request){
    return {
      db,
      prisma,
      pubSub,
      request,
    }
  }
});

// start the server
server.start(() => {
  return console.log('Server is running on localhost:4000')
});