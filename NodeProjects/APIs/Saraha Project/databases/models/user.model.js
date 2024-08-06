import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age:{
        type: Number,
        min: [12, "You must be at least 12 years old to register"],
        max: [65, "You must be at most 65 years old to register"]// to strict the age and give a message if the age is not in the range
    },
    role: {
        type: String,
        enum: ["admin", "user", "guest"],
        default: "user"
    },
    verifyEmail: {
        type: Boolean,
        default: false
    },
    isActive: {
        type:Boolean,
        default: true
    }
    
}, {timestamps: true});
const userModel = mongoose.model("User", userSchema);
export default userModel;