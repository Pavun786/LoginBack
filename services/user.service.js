import bcrypt from "bcrypt";
import { client } from "../index.js";

//hash function
 export async function generateHashedPassword(password){
    const NO_OF_ROUNDS = 10;
    const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
    const hashedPassword = await bcrypt.hash(password,salt);
    console.log(salt);
    console.log(hashedPassword);
    return hashedPassword;
  }
   

export async function createUser(data) {
    return await client.db("madhurai").collection("private").insertOne(data);
}

//this function write for tocheck username is exist or not..its used in user.router.js
export async function getUserByEmail(email){
    return await client
    .db("madhurai")
    .collection("private")
    .findOne({email : email});
}
