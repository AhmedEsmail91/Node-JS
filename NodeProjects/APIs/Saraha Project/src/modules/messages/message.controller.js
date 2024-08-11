import messageModel from '../../../databases/models/message.model.js';

import jwt from 'jsonwebtoken';
import AppError from '../../utils/AppError.js';
import { catchError } from '../../middlewares/catchError.js';

const sendMessage = async (req, res) => {
    messageModel.insertMany(req.body).then((data) => {
        res.status(201).json({ message: "Message sent successfully", data: data });
    }).catch((err) => {
        next(AppError(err.message, 400));
    });
}
const userMessages =catchError( async (req, res,next) => {
    // get the user id from the token from the previous middleware which is auth
    const userId=jwt.verify(req.headers.auth,process.env.JWT_SECRET).userId;
    const messages = await messageModel.find({ receivedId: userId }).populate("receivedId", "name email -_id");
    if (messages.length > 0) {
        res.status(200).json({ message: "All Messages", data: messages });
    } else {
        next(new AppError("No Messages", 404));
    }
});

export default { sendMessage ,userMessages };