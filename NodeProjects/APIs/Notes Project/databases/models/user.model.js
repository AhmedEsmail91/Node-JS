import mongoose from "mongoose";
const UserSchema=new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role:{
        type:String,
        enum:['user','admin'],//enum means the value of role can be either user or admin.
        default:'user'
    }
},{timestamps:true});
export const userModel=mongoose.model("user",UserSchema);