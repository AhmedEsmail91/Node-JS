import bcrypt from 'bcrypt';
export const passwordHashing=(req,res,next)=>{
    req.body.password=bcrypt.hashSync(req.body.password,10);
    next();
}