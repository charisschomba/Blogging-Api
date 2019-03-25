//Type definitions  (schema)
export default `

  type Query {
  posts(query: String):[Post!]!
  users(query: String): [User!]!
  comments(query: String): [Comment!]!
  }
  
  type Mutation{
    createUser(data: user!): User!
    createPost(data: post!): Post!
    createComment(data: comment!): Comment!
    deleteUser(id: ID!): User!
    deletePost(id: ID!): Post!
    deleteComment(id: ID!): Comment!
    updateUser(id: ID! data: updateUser!): User!
    updatePost(id: ID! data: updatePost!): Post!
    updateComment(id: ID! data: updateComment!): Comment!
  }
  
  input updateUser {
    name: String
    email: String
    age: Int
  }
  
   input updatePost {
    title: String
    body: String
    published: Boolean
  }
  
   input updateComment {
    text: String
  }
  
  input user {
    name: String!
    email: String! 
    age: Int
  }
  
  input post{
    title: String!
    body: String! 
    published:Boolean! 
    author: ID!
  }
  
  input comment {
    text: String!
    author: ID! 
    post: String!
  }
  
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
    
  }
  
  type Post {
    id: ID!
    title: String!
    body:String!
    published:Boolean!
    author: User!
    comment: [Comment!]!
  }
  
  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
  
`;