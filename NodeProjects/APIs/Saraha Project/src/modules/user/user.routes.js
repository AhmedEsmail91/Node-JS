import userController from './user.controller.js';
import express from 'express';
import {checkEmailExist} from './../../middlewares/checkEmailExist.js'
import {hashPassword} from './../../middlewares/hashPassword.js'
const router = express.Router();

router.post('/signup', checkEmailExist, hashPassword, userController.signup);
router.get('/verifyEmail/:token', userController.verifyEmail);
router.get('/allUsers', userController.allUsers); 
router.post('/signin', userController.signin); // Provide a Token
export default router;