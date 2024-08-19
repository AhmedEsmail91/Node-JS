import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    textMessage: {
        type: String,
        required: true
    },
    receivedId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
    // seenTime:{
    //     type: Date,
    //     default: null
    // },
    // softDelete:{
    //     type: Boolean,
    //     default: false
    // }
},{timestamps:true});

const Message = mongoose.model("Message", messageSchema);

export default Message;