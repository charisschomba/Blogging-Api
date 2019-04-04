import { getUserId} from "../utils/auth";

const Query = {
  users(parent, args, {db, prisma}, info) {
    const opArgs = {};
    if (args.query) {
      opArgs.where = {
        OR: [{
          name_contains: args.query.toLowerCase()
        }]
      }
    }
    return prisma.query.users(opArgs, info)
  },

  posts(parent, args, {prisma}, info) {
    const opArgs = {
      where: {
        published: true
      }
    };
    if (args.query) {
      opArgs.where.OR = [{
          title_contains: args.query.toLowerCase()
        }
        ,
      {
        body_contains: args.query.toLowerCase()
      }]
    }
    return prisma.query.posts(opArgs, info)
  },

  comments(parent, args, {prisma}, info) {
    const opArgs = {};
    if (args.query) {
      opArgs.where = {
        text_contains: args.query.toLowerCase()
      };
    }
    return prisma.query.comments(opArgs, info)
  },
  async post(parent, {id}, { prisma, request }, info){
    const userId = getUserId(request, false);
    const posts = await prisma.query.posts({
      where:{
        id,
        OR:[{
          author: {id: userId}
        },
          {published: true}]
      }
    }, info);
    if(posts.length === 0){
        throw new Error('post not found')
    }
    return posts[0]
  },

  async user(parent, args, {prisma, request}, info){
    const userId = getUserId(request);
    return await prisma.query.user({
      where:{id: userId}
    }, info)
  },

  async myPosts(parent, {query}, {prisma, request}, info){
    const userId = getUserId(request);
    const opArgs = {
      where: {
        author: {
          id: userId
        }
      }
    };
    if(query){
      opArgs.where.OR =[
        {
          title_contains: query.toLowerCase()
        },
        {
          body_contains: query.toLowerCase()
        }
      ]
    }
    return prisma.query.posts(opArgs,info)
  }
};

export default Query;