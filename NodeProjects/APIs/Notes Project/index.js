import express from 'express'
import userRouter from './src/modules/user/user.routes.js';
import dbConnection from './databases/dbConnection.js';
import noteRouter from './src/modules/note/note.routes.js';
const app = express()
const port = 3000
express.urlencoded({ extended: true });

app.use(express.json());
dbConnection();
app.use('/User/',userRouter);
app.use(noteRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))