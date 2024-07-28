import mongoose from "mongoose";
const UserSchema=new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
},{timestamps:true});
export const userModel=mongoose.model("user",UserSchema);