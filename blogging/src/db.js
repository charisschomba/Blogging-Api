const users = [
  {
    id: "84aa64cf-b6d2-406a-b635-e0f98ebb14f5",
    name: 'chariss',
    email:'C@mail.com',
  },
  {
    id:"2",
    name: 'chariss1',
    email:'C1@mail.com',
  },
  {
    id:"3",
    name: 'chariss2',
    email:'C2@mail.com',
  },
];

const posts = [
  {
    id: "84aa64cf-b6d2-406a-b635-e0f98ebb14f5",
    title: 'new',
    body: 'this is a post by chariss',
    published: true,
    author: "84aa64cf-b6d2-406a-b635-e0f98ebb14f5",
    comment: 1,
  },
  {
    id: "2",
    title: 'new1',
    body: 'this is a post1',
    published: true,
    author: "84aa64cf-b6d2-406a-b635-e0f98ebb14f5",
    comment: 2,
  },
  {
    id: 3,
    title: 'new2',
    body: 'this is a post',
    published: false,
    author: "84aa64cf-b6d2-406a-b635-e0f98ebb14f5",
    comment: 2,
  }
];

const comments = [
  {
    id: "84aa64cf-b6d2-406a-b635-e0f98ebb14f5",
    text: 'no comment',
    author: "84aa64cf-b6d2-406a-b635-e0f98ebb14f5",
    post: "2",
  },

  {
    id: "2",
    text: 'new comment1',
    author: "2",
    post: "2",
  },

  {
    id: "3",
    text: 'new comment2',
    author: "84aa64cf-b6d2-406a-b635-e0f98ebb14f5",
    post: "2",
  }
];

export default  {
  users,
  posts,
  comments,
};
