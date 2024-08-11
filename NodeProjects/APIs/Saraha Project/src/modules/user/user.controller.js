//importing models
import userModel from './../../../databases/models/user.model.js';
import {sendEmail} from './../../modules/Email/sendEmail.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { catchError } from '../../middlewares/catchError.js';
import AppError from '../../utils/AppError.js';

// Controllers
const allUsers=catchError(async(req,res)=>{
    const users=await userModel.find();
    res.status(200).json(users);
});

// Signup controller
const signup = catchError(
    async (req, res,next) => {
    const {name,email,password}=req.body;
    await userModel.insertMany({name,email,password});
    const token = jwt.sign({ email:email,name:name}, process.env.JWT_SECRET, { expiresIn: '10m' });
    await sendEmail(token, req.body.email);
    res.json({ message: "Check Your Inbox & Verify your account" });
});

const verifyEmail = catchError(
    async (req, res,next) => {
    const {email} = jwt.verify(req.params.token, process.env.JWT_SECRET);
    await userModel.findOneAndUpdate({ email: email }, { verifyEmail: true },{new:true});
    res.redirect('api/verification',{message:"Email Verified"});
    }
);
// Signin controller
const signin = catchError(
    async (req, res, next) => {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            const validPassword = bcrypt.compareSync(password, user.password);
            if (validPassword) {
                if (user.verifyEmail) {
                    let token = jwt.sign({userId:user.id,email:user.email,name:user.name}, process.env.JWT_SECRET, { expiresIn: '10m' }); // Token expires in 10 minutes
                    req.headers.auth = token;
                    res.status(200).json({ message: "Login Successful", token: token });
                }else {
                    next(new AppError("Email not verified", 400));
                }
            } else {
                next(new AppError("Invalid Password", 400)); 
            }
        } else {
            next(new AppError("User not found", 404));
        }
    }
);

// catch error (express-async-handler) [making it from scratch]
// -With this way we generalize the error handling instead of writing (try||then) & catch block in every controller.
function readToken(req,res,next){
    const token = req.headers.auth;
    if (!token) next(new AppError("Token not found", 401));
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json(req.user);
}
export default {signin,signup, verifyEmail, allUsers,readToken};