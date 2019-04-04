//Type definitions  (schema)
export default `


  type Query {
  posts(query: String first: Int skip: Int after: String orderBy: PostOrderByInput):[Post!]!
  users(query: String first: Int skip: Int after: String orderBy: UserOrderByInput): [User!]!
  comments(query: String first: Int skip: Int after: String orderBy: CommentOrderByInput): [Comment!]!
  post(id:ID!): Post!
  user:User!
  myPosts(query: String first: Int skip: Int after: String orderBy: PostOrderByInput):[Post!]!
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
    myPost: PostSubscriptionPayload!
  }
  
  input updateUser {
    name: String
    email: String
    password: String
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
    updatedAt: String!
    createdAt: String!
    
  }
  
  type Post {
    id: ID!
    title: String!
    body:String!
    published:Boolean!
    author: User!
    comment: [Comment!]!
    updatedAt: String!
    createdAt: String!
  }
  
  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
    updatedAt: String!
    createdAt: String!
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
  enum UserOrderByInput {
    id_ASC
    id_DESC
    name_ASC
    name_DESC
    password_ASC
    password_DESC
    email_ASC
    email_DESC
    updatedAt_ASC
    updatedAt_DESC
    createdAt_ASC
    createdAt_DESC
  }

  enum PostOrderByInput {
    id_ASC
    id_DESC
    title_ASC
    title_DESC
    body_ASC
    body_DESC
    published_ASC
    published_DESC
    updatedAt_ASC
    updatedAt_DESC
    createdAt_ASC
    createdAt_DESC
  }

  enum CommentOrderByInput {
    id_ASC
    id_DESC
    text_ASC
    text_DESC
    updatedAt_ASC
    updatedAt_DESC
    createdAt_ASC
    createdAt_DESC
  }
`;
