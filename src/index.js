import { GraphQLServer} from "graphql-yoga";

import resolvers from './resolvers';
import typeDefs from './types'

// create server
const server = new GraphQLServer({
  typeDefs,
  resolvers
});

// start the server
server.start(() => console.log('Server is running on localhost:4000'));