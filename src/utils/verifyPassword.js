import {hash} from "bcrypt";

const hashPasword = async(password) => {

  if(password.length < 8){
    throw new Error("Password must be 8 or more characters")
  }
  return hash(password, 10);
};
export default hashPasword;