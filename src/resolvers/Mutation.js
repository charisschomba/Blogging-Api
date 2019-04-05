import { hash, compare } from 'bcrypt';
import { genToken, getUserId} from "../utils/auth";
import hashPassword from '../utils/verifyPassword';

const Mutation = {
  async createUser(parent, args, { prisma }, info){
    const emailTaken = await prisma.exists.User({email: args.data.email});
    if(emailTaken){
      throw new Error('email taken')
    }
    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password: await hashPassword(args.data.password)
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

  async createComment(parent, { data }, { prisma, request }, info){
    const userId = getUserId(request);
    const isPublished = await prisma.exists.Post({
        id: data.post,
        published: true,
    });

    if(!isPublished){
      throw new Error('unable to create comment')
    }

    return prisma.mutation.createComment({
      data: {
        text: data.text,
        author: {
          connect: {
            id: userId
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

  async deleteUser(parent, args, { prisma, request }, info){
    const userId = getUserId(request);
    return await prisma.mutation.deleteUser({
      where:{
        id: userId
      }}, info)
  },

  async deletePost(parent, { id }, { prisma, request }, info) {
    const userId = getUserId(request);
    const postExists = await prisma.exists.Post({
      id,
      author: {
        id: userId
      }
    });
    if(!postExists){
      throw new Error('Unable to delete post')
    }
    return prisma.mutation.deletePost({
      where: {id}
      }, info)
},

  async deleteComment(parent, { id }, { prisma, request }, info) {
    const userId = getUserId(request);
    const commentExists = await prisma.exists.Comment({
      id,
      author: {
        id: userId
      }
    });
    if(!commentExists){
      throw  new Error('unable to delete comment')
    }
    return prisma.mutation.deleteComment({
      where: {
        id
      }
    }, info)
  },

  async updateUser(parent, { data }, { prisma, request }, info){
    const userId = getUserId(request);
    if(data.password){
      data.password = await hashPassword(data.password)
    }
    return prisma.mutation.updateUser({
      where:{
        id: userId
      },
      data
    }, info)
  },

  async updatePost(parent, {  data, id }, { prisma, request}, info){

    const userId = getUserId(request);
    const postExists = await prisma.exists.Post({
      id,
      author: {
        id: userId
      }
    });
    const isPublished = await prisma.exists.Post({id, published: true});
    if(!postExists){
      throw  new Error('unable to update post')
    }

    if(isPublished && data.published === false){
      await  prisma.mutation.deleteManyComments({
        where: {
         post: {id}
        }
      })
    }
    return prisma.mutation.updatePost({
      where: {
        id
      },
      data
    }, info);

  },

  async updateComment(parent, { data, id }, {prisma, request }, info){
    const userId = getUserId(request);
    const userExists = await prisma.exists.Comment({
      id,
      author: {
        id: userId
      }
    });
    if(!userExists){
      throw  new Error('unable to update post')
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

