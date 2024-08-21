process.on('uncaughtException',err=>{ 
  console.log('Uncaught Exception',err.name,err.message);
  console.log('Shutting down the server due to Uncaught Exception');
  process.exit(1);
})
import express, { Router } from 'express';
import dotenv from 'dotenv';dotenv.config();
import cors from 'cors';
import dbConnect from "./databases/dbConnection.js";
import expresslistendpoints from 'express-list-endpoints';
import AppError from './src/utils/AppError.js';
dbConnect();
dotenv.config();
const app = express()
const port = process.env.PORT || 3000;

//Calling the defualt required middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//publicate the uploads folder to be accessed by the client.
app.use("/uploads",express.static('uploads'));// access use (localhost:3000/upload/fileName) to get the file.

// calling Routes
import userRoutes from './src/modules/user/user.routes.js';
import messageRoutes from './src/modules/messages/message.routes.js';
import photoRoutes from './src/modules/Photo/photo.routes.js';
app.use('/api', userRoutes);
app.use('/api', messageRoutes);
app.use('/api', photoRoutes);



// display all end points.
app.get('/all-end-points', (req, res) => {
  res.send({endpoits:expresslistendpoints(app)});
})

app.use("*",(req,res,next)=>{
  next(new AppError(`Not Found endPoint ${req.originalUrl}`,404));
});

import { globalError } from './src/middlewares/globalErrorMiddleware.js';
app.use(globalError);

process.on('unhandledRejection',(err)=>{
  console.log('Unhandled Rejection',err.name,err.message);
  console.log('Shutting down the server due to Unhandled Promise Rejection');
  process.exit(1);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
