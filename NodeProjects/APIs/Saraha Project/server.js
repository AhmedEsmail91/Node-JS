import express, { Router } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnect from "./databases/dbConnection.js";
import expresslistendpoints from 'express-list-endpoints';
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
app.use('/api', userRoutes);
app.use('/api', messageRoutes);

app.get('/', (req, res) => {
  res.send('Verfied Done');
})
app.get('/all-end-points', (req, res) => {
  res.send({endpoits:expresslistendpoints(app)});
})

app.use((err,req, res,next) => {
  res.status(500).json({ error: err });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
