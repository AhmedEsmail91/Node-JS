import userModel from './../../../databases/models/user.model.js';
import {sendEmail} from './../../modules/Email/sendEmail.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const signup = async (req, res) => {
    jwt.sign({ email: req.body.email }, process.env.JWT_SECRET, { expiresIn: '1d' }, async (err, token) => {
        if (err) {
            res.status(500).json({ message: err.message });
        }
        await sendEmail(token, req.body.email);
    });
    userModel.insertMany(req.body).then((data) => {
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

export default {signup, verifyEmail};