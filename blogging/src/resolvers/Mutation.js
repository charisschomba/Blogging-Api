import { hash, compare } from 'bcrypt';
import { genToken, getUserId} from "../utils/auth";

const Mutation = {
  async createUser(parent, args, { prisma }, info){
    const emailTaken = await prisma.exists.User({email: args.data.email});
    if(emailTaken){
      throw new Error('email taken')
    }
    if(args.data.password.length < 8){
      throw new Error("Password must be 8 or more characters")
    }
    const password = await hash(args.data.password, 10);
    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password
    }
    });
    return {
      user,
      token: genToken({userId: user.id}, "hello")
    }
  },

  async login(parent, {data}, {prisma}, info){
     const user = await prisma.query.user({
        where:{
          email: data.email
        }
      });
    if(!user){
      throw new Error('user not found')
    }
    const isMatch = await compare(data.password, user.password);
    if(!isMatch){
      throw new Error('unable to login')
    }

    return {
      user,
      token: genToken({userId: user.id}, "hello")
    }

  },

  async createPost(parent,{data}, {prisma, request}, info){
    const userId = getUserId(request);
    return prisma.mutation.createPost({
      data: {
        title: data.title,
        body: data.body,
        author:{
          connect: {
            id: userId
          }
        },
        published: data.published
      }
    }, info)
  },

  async createComment(parent, { data }, { prisma, pubSub }, info){
    const userExists = await prisma.exists.User({id: data.author});

    if(!userExists){
      throw new Error('user not found')
    }
    return prisma.mutation.createComment({
      data: {
        text: data.text,
        author: {
          connect: {
            id: data.author
          }
        },
        post: {
          connect: {
            id: data.post
          }
        }
      }
    }, info);
  },

  async deleteUser(parent, args, { prisma }, info){
    const userExists = await prisma.exists.User({id: args.id});
    if(!userExists){
      throw  new Error('user not found')
    }
    return await prisma.mutation.deleteUser({
      where:{
        id: args.id
      }}, info)
  },

  async deletePost(parent, { id }, { prisma, pubSub }, info) {
    const postExists = await prisma.exists.Post({id});
    if(!postExists){
      throw  new Error('user not found')
    }
    return prisma.mutation.deletePost({
      where: {id}
      }, info)
},

  deleteComment(parent, { id }, { prisma, pubSub }, info) {
    const commentExists = prisma.exists.Comment({id});
    if(!commentExists){
      throw  new Error('comment not found')
    }
    return prisma.mutation.deleteComment({
      where: {
        id
      }
    }, info)
  },

  async updateUser(parent, { data, id }, { prisma }, info){

    const userExists = await prisma.exists.User({id});
    if(!userExists){
      throw  new Error('user not found')
    }
    return prisma.mutation.updateUser({
      where:{
        id
      },
      data
    }, info)
  },

  async updatePost(parent, { body, data, id }, { prisma, pubSub }, info){
    const userExists = await prisma.exists.Post({id: data.id});
    if(!userExists){
      throw  new Error('post not found')
    }
    return prisma.mutation.updatePost({
      where: {
        id
      },
      data
    }, info);

  },

  async updateComment(parent, { data, id }, {prisma, pubSub }, info){
    const userExists = await prisma.exists.Comment({id});
    if(!userExists){
      throw  new Error('comment not found')
    }
    return prisma.mutation.updateComment({
      where: {
        id
      },
      data
    }, info)
  },

};

export default Mutation;

