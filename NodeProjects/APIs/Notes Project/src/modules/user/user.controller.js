import { userModel } from "../../../databases/models/user.model.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup=async (req,res,next)=>{
    await userModel.insertMany(req.body);
    res.send({message:"success"});
}

const signin=async (req,res,next)=>{
    //find
    let user=await userModel.findOne({email:req.body.email});
    //compare password
    if(user && bcrypt.compareSync(req.body.password,user.password)){
        //generate token
        let SECRET_KEY="secret";
        let token=jwt.sign({userID:user._id},SECRET_KEY);
        res.send({message:"login --- token","user_Token":token,"user_id":user._id});
    }
    else res.send({message:"email is incorrect"});
}
export default {signup,signin};