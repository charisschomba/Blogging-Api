//Type definitions  (schema)
export default `
  type Query {
  posts(query: String):[Post!]!
  users(query: String): [User!]!
  me: User!,
  post: Post!
  }
  
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    
  }
  
  type Post {
    id: ID!
    title: String!
    body:String!
    published:Boolean!
    author: User!
  }
  
  type Comment {
    id: ID!
    text: String!
  }
  
`;