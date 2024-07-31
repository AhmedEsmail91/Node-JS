import { checkEmailExist } from "../../middlewares/checkEmailExist.js";
import userController from "./user.controller.js";
import express from "express";
const userRouter=express.Router();

userRouter.post("/signup",checkEmailExist,userController.signup);

export default userRouter;