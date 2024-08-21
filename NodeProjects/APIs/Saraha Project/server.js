process.on('uncaughtException',err=>{ 
  console.log('Uncaught Exception',err.name,err.message);
  console.log('Shutting down the server due to Uncaught Exception');
  process.exit(1);
})
import express, { Router } from 'express';
import dotenv from 'dotenv';
dotenv.config();
// .config() method is used to load the environment variables from the .env file into the process.env object, can take: {path: './path/to/.env'}.
import cors from 'cors';
import dbConnect from "./databases/dbConnection.js";
import expresslistendpoints from 'express-list-endpoints';
import AppError from './src/utils/AppError.js';
dbConnect();
dotenv.config();
const app = express()
const port = process.env.PORT || 3000;
//Calling the required middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

import userRoutes from './src/modules/user/user.routes.js';
import messageRoutes from './src/modules/messages/message.routes.js';
import { globalError } from './src/middlewares/globalErrorMiddleware.js';
app.use('/api', userRoutes);
app.use('/api', messageRoutes);

app.get('/', (req, res) => {
  res.send('Verfied Done');
})
// display all end points.
app.get('/all-end-points', (req, res) => {
  res.send({endpoits:expresslistendpoints(app)});
})
// -----------------File Upload-----------------
import multer from 'multer';
import {v4 as uuidv4} from 'uuid'; // making Universal Unique Id.
// multer.diskStorage() is used to configure the disk storage engine.
const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    // cb callback function to tell multer where to store the file takes 2 arguments (error,destination);
    cb(null,'uploads/');
  },
  filename:(req,file,cb)=>{
    // cb here takes 2 arguments (error,filename);
    cb(null,uuidv4()+'-'+file.originalname); // naming the file with a random name and its original extension.
  }
})

//-------------------File Filter-----------------
// Filter the file type.
function fileFilter(req,file,cb){
   /*
   * //-----------File Object Structure-----------
   * {"fieldname"
   * "originalname"
   * "encoding"
   * "mimetype"
   * "destination"
   * "filename"
   * "path"
   * "size"}
   * */
  if(file.fieldname==='img'){
    if(file.mimetype.startsWith("image")){
      cb(null,true); // accept the file pass it to the storage.
    }else{
      cb(new AppError('File Type Not Supported',400),false);// refuse the file pass it to the storage and through an AppError(message,statusCode).
    }
  }
  if(file.fieldname==="name"){
    
  }
}
//-------------------/End File Filter-----------------
// Assign the multer middleware configuration to the upload variable.
import photoModel from './databases/models/photo.model.js';

const upload = multer({ dest: 'uploads/',storage:storage ,fileFilter:fileFilter});


// endpoint to upload a file.
app.post('/upload', upload.single('img'),async(req, res) => {
  req.body.img=req.file.filename;
  await photoModel.insertMany(req.body);
  res.json({message:"success",fileData:{...req.body.img,...req.body.title}});
});
//-----------------/End File Upload-----------------
//-----------------Get AllPhotos-----------------
app.use("/uploads",express.static('uploads'));// access use (localhost:3000/upload/fileName) to get the file.

app.get('/all-photos',async(req,res,next)=>{
  photoModel.find().then((photos)=>{
    photos.map(photo=>photo.img=`http://localhost:${process.env.PORT}/uploads/${photo.img}`);
    res.json(photos);
  }).catch((err)=>{
    next(new AppError(err.message,400));
  });
});

//-----------------/End Get AllPhotos-----------------

app.use("*",(req,res,next)=>{
  next(new AppError(`Not Found endPoint ${req.originalUrl}`,404));
});

app.use(globalError);

process.on('unhandledRejection',(err)=>{
  console.log('Unhandled Rejection',err.name,err.message);
  console.log('Shutting down the server due to Unhandled Promise Rejection');
  process.exit(1);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
