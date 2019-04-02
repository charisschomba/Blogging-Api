const Query = {
  users(parent, args, {db, prisma}, info) {
    const opArgs = {};
    if (args.query) {
      opArgs.where = {
        OR: [{
          name_contains: args.query.toLowerCase()
        },
          {
            email_contains: args.query.toLowerCase()
          }]
      }
    }
    return prisma.query.users(opArgs, info)
  },

  posts(parent, args, {prisma}, info) {
    const opArgs = {};
    if (args.query) {
      opArgs.where = {
        OR: [{
          title_contains: args.query.toLowerCase()
        }
          ,
          {
            body_contains: args.query.toLowerCase()
          }]
      }
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
  }
};

export default Query;