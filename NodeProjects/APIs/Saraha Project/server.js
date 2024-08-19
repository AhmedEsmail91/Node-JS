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
    // naming the file randomly:
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());

    // Rational naming:
    // file.originalname ==> the original name of the file with its extension.
    // const ext=file.originalname.split('.').pop(); // getting the extension.
    // cb(null,file.originalname); // naming the file with its original name and extension.
    cb(null,uuidv4()+'-'+file.originalname); // naming the file with a random name and its original extension.
  }
})
const upload = multer({ dest: 'uploads/',storage:storage }) // this creates a folder named uploads in the root of the project.
// upload.single() // this uploads from single file from an input
// upload.array() // this uploads from multiple file from an input
// upload.fields() // this uploads from multiple file from multiple inputs
// upload.none() // this uploads from no file from an input Only text data
// upload.any() // this uploads from any file from any input
import photoModel from './databases/models/photo.model.js';

app.post('/upload', upload.single('img'),(req, res) => {

  res.json({message:"success",fileName:req.file.originalname,destination:req.file.destination+req.file.filename});
});
//-----------------/End File Upload-----------------

// for handling 404 routes [must be in the end of the file cause js compile it line by line] to handle all routes that not exist.
app.use("*",(req,res,next)=>{
  // res.status(404).json({error:`Not Found endPoint ${req.originalUrl}`}); // this is a response not error to pass it to the Global error handling middleware
  // so we need to make it as an Error not a response.
  next(new AppError(`Not Found endPoint ${req.originalUrl}`,404));
});

app.use(globalError);
/**Process
 * process is a global object representing the node.js process. like window in the browser.
 * process.on() is used to register the handler for the given event.
 * process.on('unhandledRejection',); is used to handle the unhandled promise rejections.
 * process.on('uncoughtException',); is used to handle the unhandled exceptions.(write on top of the file)
 * in fires when you have a promise that is rejected but there is no .catch() handler to deal with the rejection.
 * like the database connection in the dbConnection.js file, if the connection failed the error will be unhandled.
 */

process.on('unhandledRejection',(err)=>{
  console.log('Unhandled Rejection',err.name,err.message);
  console.log('Shutting down the server due to Unhandled Promise Rejection');
  process.exit(1);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
