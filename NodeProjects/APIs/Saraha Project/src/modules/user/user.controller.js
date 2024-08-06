
import userModel from './../../../databases/models/user.model.js';
const signup = async (req, res) => {

    userModel.insertMany(req.body).then((data) => {
        res.status(201).json({ message: "User created successfully" });
    }).catch((err) => {
        res.status(500).json({ message: err.message });
    });
};
export default {signup};