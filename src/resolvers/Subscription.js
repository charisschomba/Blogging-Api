const Subscription = {

  comment: {
    subscribe(parent, {postId}, {db:{posts}, pubSub}, info) {
      const post = posts.find(post => post.id === postId && post.published);
      if(!post) {
        throw new Error( "Post not found")
      }
      return pubSub.asyncIterator(`comment ${postId}`)
    }
  },

  post: {
    subscribe(parent, args, {pubSub}, info){
      return pubSub.asyncIterator('post')
    }
  }
};

export default Subscription;