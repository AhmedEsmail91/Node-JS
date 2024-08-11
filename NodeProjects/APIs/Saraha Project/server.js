import express, { Router } from 'express';
import dotenv from 'dotenv';
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

// for handling 404 routes [must be in the end of the file cause js compile it line by line] to handle all routes that not exist.
app.use("*",(req,res,next)=>{
  // res.status(404).json({error:`Not Found endPoint ${req.originalUrl}`}); // this is a response not error to pass it to the Global error handling middleware
  // so we need to make it as an Error not a response.
  next(new AppError(`Not Found endPoint ${req.originalUrl}`,404));
});

app.use(globalError);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
/**Status Codes
 * 100-199: Informational
 * 200-299: Success
 * 300-399: Redirection
 * 400-499: Client Error (the client made an error)
 * 500-599: Server Error (the server made an error)
 */