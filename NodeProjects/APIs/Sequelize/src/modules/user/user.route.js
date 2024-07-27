import {Router} from 'express';
import userController from './user.controller.js';
const userRouter = Router();
// //-----------------Inserting the record in the table-----------------
// userRouter.post('/addUser', userController.addUser);
// //-----------------Fetching the records from the table-----------------
// userRouter.get('/allUsers', userController.allUsers);
// //-----------------Updating a record from the table-----------------
// userRouter.put('/updateUser/:id',userController.updateUser);
// //-----------------Deleting a record from the table----------------- 
// userRouter.delete('/deleteUser/:id', userController.deleteUser);
// or in another way since we can name all routes with the same name but with different methods:
userRouter.route('/users').get(userController.allUsers).post(userController.addUser);
userRouter.route('/users/:id').put(userController.updateUser).delete(userController.deleteUser);
export {userRouter};