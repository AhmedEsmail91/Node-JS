import userModel from './../../../databases/models/user.model.js';
import {sendEmail} from './../../modules/Email/sendEmail.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const allUsers=async(req,res)=>{
    userModel.find().then((data)=>{
        res.status(200).json({message:"All Users",data:data});
    }).catch((err)=>{
        res.status(500).json({message:err.message});
    });
}

const signup = async (req, res) => {
    userModel.insertMany(req.body).then((data) => {
        jwt.sign({ email: req.body.email,name:req.body.name}, process.env.JWT_SECRET, { expiresIn: '10m' }, async (err, token) => {
            if (err) {
                res.status(500).json({ message: err.message });
            }
            await sendEmail(token, req.body.email);
        });
        res.status(201).json({ message: "User created successfully" });
    }).catch((err) => {
        res.status(500).json({ message: err.message });
    });

    
    
    
};
const verifyEmail = async (req, res) => {
    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;
    userModel.findOneAndUpdate({ email: email }, { verifyEmail: true },{new:true}).then((data) => {
        // res.status(200).json({ message: "Email verified successfully" ,"Account":data});
        res.redirect('/', 301);
    }).catch((err) => {
        res.status(500).json({ message: err.message });
    });
}
const signin=async(req,res)=>{
    const user=await userModel.findOne({email:req.body.email});
    if(user){
        const validPassword=bcrypt.compareSync(req.body.password,user.password);
        if(validPassword){
            if(user.verifyEmail){
                let token=jwt.sign({
                    userId:user._id,
                    username:user.name,
                    email:user.email
                },process.env.JWT_SECRET,{expiresIn:'10m'});
                req.headers.auth=token;
                res.status(200).json({message:"Login Successfull",token:token});
            }
            else res.status(400).json({message:"Email not verified"});
        }else{
            res.status(400).json({message:"Invalid Password"});
        }
    }
    else{
        res.status(400).json({message:"Invalid Email"});
    }
}
export default {signin,signup, verifyEmail, allUsers};