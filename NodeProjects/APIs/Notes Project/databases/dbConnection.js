import mongoose from "mongoose";
export default function dbConnection(){
    mongoose.set('strictQuery', true);
    mongoose.connect('mongodb://localhost:27017/notes_project').then(()=>{
        console.log("Connected to MongoDB");
    }).catch((err)=>{
        console.log('Error:',err);
    });
}
