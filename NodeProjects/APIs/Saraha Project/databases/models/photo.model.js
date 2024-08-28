import mongoose, { mongo } from "mongoose";
const schema=new mongoose.Schema({
    title:String,
    img:String,
    images:[String]
},{timestamps:true});

// init for find 
schema.post("init", (doc) => {
    doc.img=`${process.env.HOST}:${process.env.PORT}/uploads/${doc.img}`;
    doc.images.map(img=>`${process.env.HOST}:${process.env.PORT}/uploads/${img}`);
});
// make aggregate to return the count in the collection.
// schema.post("init")

const photoModel=mongoose.model("Photo",schema);

export default photoModel;