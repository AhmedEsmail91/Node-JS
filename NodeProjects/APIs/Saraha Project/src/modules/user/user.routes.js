import userController from './user.controller.js';
import express from 'express';
import {checkEmailExist} from './../../middlewares/checkEmailExist.js'
import {hashPassword} from './../../middlewares/hashPassword.js'
const router = express.Router();
router.post('/signup', checkEmailExist, hashPassword, userController.signup);
export default router;