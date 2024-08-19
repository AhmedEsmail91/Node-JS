import mongoose, { mongo } from "mongoose";
const photo=new mongoose.Schema({
    title:String,
    img:String
},{timestamps:true});
const photoModel=mongoose.model("Photo",photo);

export default photoModel;