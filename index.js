import  express  from "express";
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import { Login, Register, getCurrentUser } from "./CONTROOLERS/User.Controolers.js";
import mongoose from "mongoose";


const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"))
dotenv.config();


app.get("/",(req,res)=>{
    res.send ("Working My Backend .....")
})

// allUser
app.post("/register",Register)
app.post("/login",Login)
app.post("/get-current-user",getCurrentUser)


mongoose.connect(process.env.Mongo_URL).then(()=>{
    console.log("connect to DB...." )
})

app.listen(8000,()=>{
console.log("Listing on Port 8000")
})