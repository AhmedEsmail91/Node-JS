import express from 'express';
import {userRouter} from './src/modules/user/user.route.js';
const app = express();
app.use(express.json());
//*adding prefix to all routes
app.use('/api',userRouter);
// app.use(userRouter);
const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));