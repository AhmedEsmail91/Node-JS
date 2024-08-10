import jwt from 'jsonwebtoken';
//Verify the token.
const auth=async(req,res,next)=>{
    try{
        const token=req.headers.auth;
        if(!token) res.status(401).json({message:"Token not found"});        
        req.userData=jwt.verify(token,process.env.JWT_SECRET);
        next();
    }catch(err){
        res.status(401).json({message:"Token Expired"});
    }
};
export default auth;