import { GraphQLServer} from "graphql-yoga";
import db from './db';
import resolvers from './resolvers';
import typeDefs from './schema'

// create server
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: {
    db
  }
});

// start the server
server.start(() => {
  return console.log('Server is running on localhost:4000')
});