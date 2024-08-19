import AppError from '../utils/AppError.js';
import { catchError } from './catchError.js';
// Signup validation function
const validation=(schema)=>{
    return async (req, res, next)=>{
    // abortEarly:false will return all errors not just the first one, Note: it returns first error by default
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        console.log(error.details);
        next(new AppError(error.details, 400));
    } else {
        next();
    }
}  
};
export {validation};