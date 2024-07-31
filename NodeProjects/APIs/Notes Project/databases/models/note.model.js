import mongoose from "mongoose";
const UserSchema=new mongoose.Schema({
    title: String,
    desc: String,
    createdBy: mongoose.Types.ObjectId // createdBy is an object that contains the user's id and name.
    
},{timestamps:true});

export const noteModel=mongoose.model("note",UserSchema);