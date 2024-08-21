import mongoose, { mongo } from "mongoose";
const schema=new mongoose.Schema({
    title:String,
    img:String
},{timestamps:true});

// init for find 
schema.post("init", (doc) => {
    doc.img=`${process.env.HOST}:${process.env.PORT}/uploads/${doc.img}`;

});

const photoModel=mongoose.model("Photo",schema);
export default photoModel;