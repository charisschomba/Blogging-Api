import { GraphQLServer} from "graphql-yoga";

//Type definitions  (schema)
const typeDefs = `
  type Query {
    hello: String!
    name: String!
  }
`;

// Resolvers

const resolvers = {
  Query: {
    hello(){
      return 'This is my first query'
    },
    name(){
      return 'This is a name'
    }
  }
};

// create server
const server = new GraphQLServer({
  typeDefs,
  resolvers
});

// start the server
server.start(() => console.log('Server is running on localhost:4000'))