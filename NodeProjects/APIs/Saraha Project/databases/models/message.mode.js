import mongoose from "mongoose";
const messagaSchema = new mongoose.Schema({
    textMessage: String,
    recievedId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
});
const messageModel = mongoose.model("Message", messagaSchema);
export default messageModel;