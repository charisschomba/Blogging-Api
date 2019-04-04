//Type definitions  (schema)
export default `

  type Query {
  posts(query: String):[Post!]!
  users(query: String): [User!]!
  comments(query: String): [Comment!]!
  post(id:ID!): Post!
  user:User!
  myPosts(query: String):[Post!]!
  }
 
  type Mutation{
    createUser(data: user!): Authpayload!
    login(data: login!): Authpayload!
    createPost(data: post!): Post!
    createComment(data: comment!): Comment!
    deleteUser: User!
    deletePost(id: ID!): Post!
    deleteComment(id: ID!): Comment!
    updateUser(data: updateUser!): User!
    updatePost(id: ID! data: updatePost!): Post!
    updateComment(id: ID! data: updateComment!): Comment!
  }
  
  type Subscription {
    comment(postId: ID!): CommentSubscriptionPayload!
    post: PostSubscriptionPayload!
  }
  
  input updateUser {
    name: String
    email: String
  }
  
   input login {
    email: String!
    password: String!
  }
  
  type Authpayload {
   user: User!
   token: String!
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
    password: String!
    email: String! 
  }
  
  input post{
    title: String!
    body: String! 
    published:Boolean! 
  }
  
  input comment {
    text: String!
    post: String!
  }
  
  type User {
    id: ID!
    name: String!
    password: String!
    email: String
    posts: [Post!]
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
  
  type PostSubscriptionPayload{
    mutation: MutationType!
    node: Post
  }
  
  type CommentSubscriptionPayload{
    mutation: MutationType!
    node: Comment
  }
  
  enum MutationType {
    CREATED
    UPDATED
    DELETED
  }
`;
