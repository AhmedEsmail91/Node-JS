import userController from "./user.controller.js";
import express from "express";
const userRouter=express.Router();

userRouter.post("/signup",userController.signup).get("/signin",userController.signin);

export default userRouter;