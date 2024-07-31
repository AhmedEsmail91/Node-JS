import mongoose from "mongoose";
const UserSchema=new mongoose.Schema({
    title: String,
    desc: String,
    // createdBy: mongoose.Types.ObjectId // createdBy is an object that contains the user's id and name.
    createdBy:
    {
        type:mongoose.Types.ObjectId,
        ref:"user"// ref is the reference to the user model.
    }
},{timestamps:true});

export const noteModel=mongoose.model("note",UserSchema);