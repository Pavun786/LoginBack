import express from "express"; // If pakage.json "type":"module"....New import methoed
 import {MongoClient} from "mongodb";
 import * as dotenv from "dotenv";
 import cors from "cors";

 import userRouter from "./routes/user.route.js"

 dotenv.config();

 const app = express();

const PORT = process.env.PORT;

//connection:-------
//const MONGO_URL ='mongodb://127.0.0.1';  //127.0.0.1---> is IP of Localhost
const MONGO_URL =process.env.MONGO_URL;

const client = new MongoClient(MONGO_URL); //like phone dial with pincode
// Top level await --->its a advance features of js..condition :use at where is no fuction
await client.connect(); // call
console.log("Mongo is Connected")

//Middleware ----> express.json() is inbuild middleware in express..,used to convert JSON --> to JS
 //app.use ---> Intercepts--->writs for common all post methoed
 app.use(express.json()); 
 app.use(cors());  

 app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩..!");
});

app.use('/user',userRouter);

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`))

export {client};
