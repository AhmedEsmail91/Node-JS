import { userModel } from "../../../databases/models/user.model.js"
import bcrypt from "bcrypt";

const signup=async (req,res,next)=>{
    req.body.password=await bcrypt.hash(req.body.password,10);
    await userModel.insertMany(req.body);
    res.send({message:"success"});
}

export default {signup};