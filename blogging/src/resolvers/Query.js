import { getUserId} from "../utils/auth";

const Query = {
  users(parent, args, {db, prisma}, info) {
    const opArgs = {
      orderBy: args.orderBy,
      first: args.first,
      skip: args.skip,
      after: args.after
    };
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
      },
      orderBy: args.orderBy,
      first: args.first,
      skip: args.skip,
      after: args.after
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
    const opArgs = {
      orderBy: args.orderBy,
      first: args.first,
      skip: args.skip,
      after: args.after
    };
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

  async myPosts(parent, args, {prisma, request}, info){
    const userId = getUserId(request);
    const opArgs = {
      orderBy: args.orderBy,
      first: args.first,
      skip: args.skip,
      after: args.after,
      where: {
        author: {
          id: userId
        }
      }
    };
    if(args.query){
      opArgs.where.OR =[
        {
          title_contains: args.query.toLowerCase()
        },
        {
          body_contains: args.query.toLowerCase()
        }
      ]
    }
    return prisma.query.posts(opArgs,info)
  }
};

export default Query;