import mongoose, { Schema } from "mongoose";
const UserSchema=new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role:{
        type:String,
        enum:['user','admin'],//enum means the value of role can be either user or admin.
        default:'user'
    }
},{timestamps:true});
//mongooose middleware.
// UserSchema.pre("save",async function(next){
//     this.password=await bcrypt.hash(this.password,10);
//     next();
// });
export const userModel=mongoose.model("user",UserSchema);