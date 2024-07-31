import express from 'express'
import userRouter from './src/modules/user/user.routes.js';
import dbConnection from './databases/dbConnection.js';
const app = express()
const port = 3000
express.urlencoded({ extended: true });
app.use(express.json());
app.use('/User/',userRouter);
dbConnection();
app.listen(port, () => console.log(`Example app listening on port ${port}!`))