import express from "express";
import { createUser, generateHashedPassword, getUserByEmail } from "../services/user.service.js";
import bcrypt from "bcrypt";
import  jwt from "jsonwebtoken";


const router = express.Router()

router.post("/register", async function (request, response) {
   
    const {username,email,password} = request.body;

    const userFromDB = await getUserByEmail(email);
    console.log(userFromDB);

    if(userFromDB){
        response.status(400).send({message:"Username already exists"});
    }else if(password.length < 8){
        response
        .status(400)
        .send({message:"Password must be at least 8 characters"});
    }
    else{
    const hashedPassword = await generateHashedPassword(password);
    const result =await createUser({
        username: username,
        email:email,
        password: hashedPassword,
        
    });

//its look like mongodb command:db.detail.insertMany({})
    response.send(result)
}
   
 } );

 router.post("/login", async function (request, response) {
    const {email,password} = request.body;

    const userFromDB = await getUserByEmail(email);
    console.log(userFromDB);

    if(!userFromDB){
        response.status(401).send({message:"Invalid credentials"});
    }else{
      const storedDBPassword = userFromDB.password;
      // bcrypt.compare is a in bulit methoed in bycrpt...use to compere storedpassword Vs login password
      const isPasswordCheck = await bcrypt.compare(password,storedDBPassword);
      console.log(isPasswordCheck);
      if(isPasswordCheck){
        //jwt require 2 parameters..1.Unique key,2.Secret key
        const token = jwt.sign({id: userFromDB._id},process.env.SECRET_KEY)
        response.send({message:" Successful login",token:token});
      }else{
        response.status(401).send({message:"Invalid credentials"});
      }
    }
    
 });
 export default router;


