import {posts, users, comments} from "./mockData";
import  uuidv4 from 'uuid/v4';

// Resolvers
export default {
  Query: {
    users(parent, args, ctx, info){
      if(!args.query){
        return users
      }
      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      })
    },

    posts(parent, args, ctx, info){
      if(!args.query){
        return posts
      }
      return posts.filter(post =>{
        return post.title.toLowerCase().includes(args.query.toLowerCase());
      });
    },

    comments(parent, args, ctx, info){
      if(!args.query){
        return comments
      }
      return comments.filter(comment => {
        return comment.text.toLowerCase().includes(args.query.toLowerCase());
      });
    }

  },

  Post: {
    author(parent, args, ctx, info){
      return users.find(user => {
        return user.id === parent.author
      });
    },

    comment(parent, args, ctx, info){
      return comments.filter(comment => {
        return parent.id === comment.post
      })
    },

  },

  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => {
        return parent.id === post.author
      });
    },

    comments(parent, args, ctx, info){
      return comments.filter(comment => {
        return parent.id === comment.author
      });
    }
  },

  Comment: {
    author(parent, args, ctx, info){
      return users.find(user => {
        return user.id === parent.author
      });
    },

    post(parent, args, ctx, info){
      return posts.find(post => {
        return  parent.post === post.id
      })
    }
  },

  Mutation: {
    createUser(parent, args, ctx, info){
      const emailTaken = users.some(user => user.email === args.data.email);
      if(emailTaken){
        throw new Error('email taken')
      }
      const user = {
        id: uuidv4(),
        ...args.data
      };
      users.push(user);
      return user
    },

    createPost(parent,args, ctx, info){
      const userExists = users.some((user) => {
        return user.id === args.data.author
      });

      if(!userExists){
        throw new Error('user not found')
      }
      const post = {
        id: uuidv4(),
        ...args.data
      };
      posts.push(post);
      return post
    },

    createComment(parent, args, ctx, info){
      const userExists = users.some((user) => {
        return user.id === args.data.author
      });

      if(!userExists){
        throw new Error('user not found')
      }
      const postExists = posts.some(post => (post.id === args.data.post) && post.published);
      if(!postExists){
        throw new Error('user not found')
      }

      const comment = {...args.data};
      comments.push(comment);
      return comment;
    }

  },
};
