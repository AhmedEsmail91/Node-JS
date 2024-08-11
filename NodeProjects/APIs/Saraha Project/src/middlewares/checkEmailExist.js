import userModel from "../../databases/models/user.model.js";
import AppError from "../utils/AppError.js";
const checkEmailExist = async (req, res, next) => {
    const { email } = req.body;
    const { name } = req.body;
    const user = await userModel.findOne({ email:email });
    if (user) return next(new AppError("Email already exists", 409)); // 409 --> Conflict
    else next();
}

export  { checkEmailExist };