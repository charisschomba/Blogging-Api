import jwt from 'jsonwebtoken';

export const genToken = (payload, secret) => (
  jwt.sign(payload, secret, {expiresIn: '7 days'})
);


export const getUserId = (request, requireAuth=true) => {
  const header = request.request ? request.request.headers.authorization : request.connection.context.Authorization;
  if(header){
    const token = header.replace("Bearer ", "");
    const decoded = jwt.verify(token, "hello");
    return decoded.userId
  }
  if(requireAuth){
    throw new Error("Authentication is required")
  }

  return null

};