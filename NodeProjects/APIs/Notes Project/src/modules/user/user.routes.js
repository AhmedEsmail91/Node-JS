import { checkEmailExist } from "../../middlewares/checkEmailExist.js";
import { passwordHashing }  from "../../middlewares/hashPassword.js";
import userController from "./user.controller.js";
import express from "express";
const userRouter=express.Router();

userRouter.post("/signup",checkEmailExist,passwordHashing,userController.signup);
userRouter.post("/signin",userController.signin);

export default userRouter;