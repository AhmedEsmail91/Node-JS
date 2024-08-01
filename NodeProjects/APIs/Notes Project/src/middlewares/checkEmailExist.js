import { now } from 'mongoose';
import {userModel} from '../../databases/models/user.model.js';

const checkEmailExist = async (req, res, next) => {
    let user = await userModel.findOne({ email: req.body.email });
    
    if (user) {
            console.log("Forbidden!!!",req.body,now())
            return res.send({ message: `Email already exists (${user.role})` });
    } else {
        console.log("Pass to next middleware",req.body,now())
        return next();
    }
};
export {checkEmailExist};