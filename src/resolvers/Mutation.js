import uuidv4 from "uuid/v4";

const Mutation = {
  createUser(parent, args, {db}, info){
    const emailTaken = db.users.some(user => user.email === args.data.email);
    if(emailTaken){
      throw new Error('email taken')
    }
    const user = {
      id: uuidv4(),
      ...args.data
    };
    db.users.push(user);
    return user
  },

  createPost(parent,args, {db}, info){
    const userExists = db.users.some((user) => {
      return user.id === args.data.author
    });

    if(!userExists){
      throw new Error('user not found')
    }
    const post = {
      id: uuidv4(),
      ...args.data
    };
    db.posts.push(post);
    return post
  },

  createComment(parent, args, { db }, info){
    const userExists = db.users.some((user) => {
      return user.id === args.data.author
    });

    if(!userExists){
      throw new Error('user not found')
    }
    const postExists = db.posts.some(post => (post.id === args.data.post) && post.published);
    if(!postExists){
      throw new Error('user not found')
    }

    const comment = {...args.data};
    db.comments.push(comment);
    return comment;
  },
  deleteUser(parent, args, { db }, info){
    const userIndex = db.users.findIndex(user => {
      return user.id === args.id
    });
    if(userIndex === -1){
      throw  new Error('user not found')
    }
    const deletedUser = db.users.splice(userIndex, 1);
    db.posts = db.posts.filter(post => {
      const match = post.author === args.id;
      if(match){
        db.comments.filter(comment => comment.post !== post.id)
      }
      return !match
    });

    db.comments = db.comments.filter(comment => comment.author !== args.id);
    return deletedUser[0]
  },

  deletePost(parent, args, { db }, info) {
    const postExists = db.posts.findIndex(post =>  post.id === args.id);
    if(postExists === -1){
      throw  new Error('post not found')
    }
    const deletedPost = db.posts.splice(postExists, 1);
    db.comments = db.comments.filter(comment => comment.post !== args.id);
    return deletedPost[0]
  },

  deleteComment(parent, args, { db }, info) {
    const commentExists = db.comments.findIndex(comment =>  comment.id === args.id);
    if(commentExists === -1){
      throw  new Error('post not found')
    }
    const deletedComment = db.comments.splice(commentExists, 1);
    return deletedComment[0]
  },

  updateUser(parent, { data, id }, { db: {users} }, info){
    const user = users.find( user => user.id === id);
    if(!user){
      throw  new Error('user not found')
    }
    if(typeof data.email === 'string'){
      const emailTaken = users.some(user => user.email === data.email);
      if(emailTaken){
        throw  new Error('Email taken')
      }
     user.email = data.email
    }
    if(typeof data.name === 'string'){
      user.name = data.name
    }

    if(typeof data.name === 'undefined'){
      user.age = data.age
    }

    return user
  },

  updatePost(parent, { body, data, id }, { db: {posts} }, info){
    const post = posts.find( post => post.id === id);
    if(!post){
      throw  new Error('post not found')
    }
    if(typeof data.title === 'string'){
      post.title = data.title
    }
    if(typeof data.body === 'string'){
      post.body = data.body
    }

    if(typeof data.published === 'boolean'){
      post.published = data.published
    }

    return post
  },

  updateComment(parent, { data, id }, { db: {comments} }, info){
    const comment = comments.find( comment => comment.id === id);
    if(!comment){
      throw  new Error('comment not found')
    }
    if(typeof data.text === 'string'){
      comment.text = data.text
    }
    return comment
  },

};

export default Mutation;

