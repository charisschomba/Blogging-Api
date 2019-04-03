const Subscription = {

  comment: {
    subscribe(parent, {postId}, { prisma }, info) {
      return prisma.subscription.comment({
        where : {
          node: {
            id: postId
          }
        }
      }, info)
    }
  },

  post: {
    subscribe(parent, args, { prisma }, info){
      return prisma.subscription.post({
        where: {
          node: {
            published: true
          }
        }
      }, info)
    }
  }
};

export default Subscription;