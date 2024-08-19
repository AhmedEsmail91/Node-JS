import userController from './user.controller.js';
import express from 'express';
import {checkEmailExist} from './../../middlewares/checkEmailExist.js'
import {hashPassword} from './../../middlewares/hashPassword.js'
import {validation} from './../../middlewares/validation.js'
import userSchema from './user.validation.js';
const router = express.Router();

router.post('/signup',validation(userSchema.signupSchemaValidation), checkEmailExist, hashPassword, userController.signup);
router.get('/verifyEmail/:token', userController.verifyEmail);
router.get('/allUsers', userController.allUsers); 
router.post('/signin', validation(userSchema.signinSchemaValidation),userController.signin); // Provide a Token
router.get('/tokens', userController.readToken);
export default router;