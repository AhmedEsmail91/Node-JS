import userModel from './../../../databases/models/user.model.js';
import {sendEmail} from './../../modules/Email/sendEmail.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const signup = async (req, res) => {
    sendEmail();
    userModel.insertMany(req.body).then((data) => {
        res.status(201).json({ message: "User created successfully" });
    }).catch((err) => {
        res.status(500).json({ message: err.message });
    });
};
export default {signup};