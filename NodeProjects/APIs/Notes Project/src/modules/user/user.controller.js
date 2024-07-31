import { userModel } from "../../../databases/models/user.model.js"
import bcrypt from "bcrypt";

const signup=async (req,res,next)=>{
    await userModel.insertMany(req.body);
    res.send({message:"success"});
}

const signin=async (req,res,next)=>{
    
    let user=await userModel.findOne({email:req.body.email});
    
    if(user && bcrypt.compareSync(req.body.password,user.password)) res.send({message:"login --- token","user_id":user._id});
    else res.send({message:"email is incorrect"});
}
export default {signup,signin};