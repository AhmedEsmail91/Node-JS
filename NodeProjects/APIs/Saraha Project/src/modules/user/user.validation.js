// Signup validation Schema
import Joi from 'joi';
let pattern='^[a-zA-Z0-9]{3,21}[!@#$%^&*()_+\\-=\\[\\]{}|;:\'",.<>?/]{1,9}$';
const signupSchemaValidation=Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp(pattern)).required(),
    rePassword: Joi.valid(Joi.ref('password')),
    age: Joi.number().min(12).max(65).required()
});
const signinSchemaValidation=Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp(pattern)).required(),
});
// Egypt Phone Pattern Regex:
// let EgyPhone_pattern="^[(002)(\+20)]*01[0125]\d{8}$";
export default {signupSchemaValidation,signinSchemaValidation};