import userModel from "../../databases/models/user.model.js";
const checkEmailExist = async (req, res, next) => {
    const { email } = req.body;
    const user = await userModel.findOne({ email:email });
    if (user) return res.status(400).json({ message: "Email already exists" });
    else next();
}

export  { checkEmailExist };