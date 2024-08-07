import messageModel from '../../../databases/models/message.model.js';

import jwt from 'jsonwebtoken';

const sendMessage = async (req, res) => {
    messageModel.insertMany(req.body).then((data) => {
        res.status(201).json({ message: "Message sent successfully", data: data });
    }).catch((err) => {
        res.status(500).json({ message: err.message });
    });
}
const userMessages = async (req, res) => {
    // get the user id from the token from the previous middleware which is auth
    const messsages =await messageModel.find({receivedId:req.userData.userId}).populate("receivedId","name email -_id");
    if(messsages){
        res.status(200).json({message:"All Messages",data:messsages});
    }
    else{
        res.status(400).json({message:"No messages found"});
    }
}
export default { sendMessage ,userMessages };