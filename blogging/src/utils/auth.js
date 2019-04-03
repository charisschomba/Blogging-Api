import jwt from 'jsonwebtoken';

export const genToken = (payload, secret) => (
  jwt.sign(payload, secret)
);


export const getUserId = (request) => {
  const header = request.request.headers.authorization;
  if(!header){
    throw new Error("Authentication is required")
  }
  const token = header.replace('Bearer ', "");
  const decoded = jwt.verify(token, "hello");
  return decoded.userId
};