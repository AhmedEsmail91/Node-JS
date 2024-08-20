import jwt from 'jsonwebtoken';
//Verify the token.
const auth=async(req,res,next)=>{
    try{
        const token=req.headers.cookie.split('=')[1]
        if(!token) next({message:"Token not found",statusCode:401});
        req.userData=jwt.verify(token,process.env.JWT_SECRET);
        next();
    }catch(err){
        next({message:err.message,statusCode:401});
    }
};
export default auth; 