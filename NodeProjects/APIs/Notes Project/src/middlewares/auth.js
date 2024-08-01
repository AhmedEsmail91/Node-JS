import jwt from "jsonwebtoken";
const auth=async(req,res,next)=>{
    let headers=req.headers;
    jwt.verify(headers.token,"secret", async(err,decoded)=>{
        if(err) return res.send({message:"token is invalid"});
        req.customData=decoded;
        next();
    });
}
export {auth};