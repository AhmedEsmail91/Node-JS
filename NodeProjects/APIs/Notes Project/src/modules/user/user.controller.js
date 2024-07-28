import { userModel } from "../../../databases/models/user.model.js"
import bcrypt from "bcrypt";
bcrypt.genSalt(10, function(err, salt) {
    if(err) {console.log(err); return;}
});
const signup= async function checkEmail(req,res){
    
    bcrypt.hash(req.body.password, 10, async function(err, hash) {
        if(err) {console.log(err); return;}
        await delete req.body.password;
        let user= await Object.assign({},req.body,{password:hash});
        console.log(hash);
        await userModel.insertMany(user);
    });
    console.log("User created");
    
}


const signin= async function(req,res){
    let {email,password}=req.body;
    let found=await userModel.findOne({email:email});
    if(!found){
        return res.json({message:"User not found"})
    }
    else{
        let match=bcrypt.compare(password,found.password,(err,result)=>{
            if(err){console.log(err); return;}
            if(result){return true}
        });
        if(!match){ return res.json({message:"Password incorrect",found})}
        else{
            return res.json({message:"User found"})
        }
    }
    
}
export default {signup,signin};