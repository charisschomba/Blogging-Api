import {posts, users, comments} from "./mockData";

// Resolvers
export default {
  Query: {
    users(parent, args, ctx, info){
      if(!args.query){
        return users
      }
      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
    },

    posts(parent, args, ctx, info){
      if(!args.query){
        return posts
      }
      return posts.filter(post =>{
        return post.title.toLowerCase().includes(args.query.toLowerCase())
      })
    },

    me(){
      return {
        id:'1',
        name:'chariss',
      }
    },

    post(){
      return{
        id:1,
        title:'new blog',
        body: 'this is the body',
        published: 't'
      }
    }
  },
  Post: {
    author(parent, args, ctx, info){
      return users.find(user => {
        return user.id === parent.author
      })
    }
  },

  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => {
        return parent.id === post.author
      })
    }
  }
};
