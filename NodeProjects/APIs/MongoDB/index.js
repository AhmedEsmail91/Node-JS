import express from 'express'
import mongoose from 'mongoose';
const app = express()

const port = 3000

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/node_mongodb').then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log('Error:',err);
}); 
//making collection schema
const {Schema} = mongoose;

const userSchema=new Schema({
    name:String,
    email:String,
    password:String,
    age:Number
});
//creating collection
const userModel=mongoose.model('user',userSchema);
// this is the collection name in the database. mongoose.model(collectionName,schema)
// once inserting the data, the collection will be created in the database.
app.get('/', async (req, res) =>{
    /*
    await userModel.insertMany([
        {
            name:'John',
            email:'john@gmail.com',
            password:'john123',
            age:25
        },
        {
            name:'Doe',
            email:'doe@gmail.com',
            password:'doe123',
            age:30
        }
    ]);*/
    //----------------find()----------------
    // let users=await userModel.find(); // getting only name field from the collection
    //----------------find()+projection----------------
    // 1. let users=await userModel.find().select('-_id -password'); // projecting out the password field from the collection.
    // 2. let users=await userModel.find({},{name:1,email:1,_id:0}); // getting only name and email field from the collection
    //----------------find()+Condition----------------
    // let users=await userModel.find(or[{name:"John"},{_id:"66a3c2d61f3e19c1bbcbac2d"}]);
    //----------------findById()+Update & Delete----------------
    await userModel.findByIdAndUpdate({_id:"66a3c2d61f3e19c1bbcbac2d"},{name:"ahmed"});
    await userModel.findByIdAndDelete({_id:"66a3c2d61f3e19c1bbcbac2d"})
    let users=await userModel.find();
    res.json(users);
    // res.json({message:'success'});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))