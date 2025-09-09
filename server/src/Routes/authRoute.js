import express from "express";
import { nanoid } from "nanoid";
const AuthRouter = express.Router();


AuthRouter.get("/login",(req,res)=>{
    res.json({message:"login working..",UUID:nanoid(10)});
})

export default AuthRouter;