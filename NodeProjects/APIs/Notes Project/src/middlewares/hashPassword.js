import bcrypt from 'bcrypt';
export const passwordHashing=(req,res,next)=>{
    req.body.password=bcrypt.hashSync(req.body.password,10);
    // *OR*
    // req.body.password=bcrypt.hash(req.body.password,10); 
    // Note:
    // hashSync is synchronous version of hash(which doesn't need await cause it doesn't return promise).
    // rounds=10: means the password will be hashed 10 times.
    next();
}