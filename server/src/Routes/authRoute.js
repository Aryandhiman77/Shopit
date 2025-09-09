import express from "express";
const AuthRouter = express.Router();


AuthRouter.get("/login",(req,res)=>{
    res.json({message:"login working.."});
})

export default AuthRouter;