import {userModel} from './../../../databases/models/user.model.js';
import postModel from './../../../databases/models/post.model.js';
async function addUser(req,res){
    await userModel.create(req.body); 
    res.json({"message":"Success"});
}
async function allUsers(req,res){
    let users=await userModel.findAll(
        {order: [['id', 'DESC']]}
    );
    res.json(users);
    
};
function updateUser(req,res){
    let id=req.params.id;
    userModel.update(
        req.body,
        {where:{id:id}});
    res.json({"message":"Record updated successfully"});
}
async function deleteUser(req,res){
    let id=req.params.id;
    await userModel.destroy({where:{id:id}});
    res.json({"message":"Record deleted successfully"});
}
export default{addUser,allUsers,updateUser,deleteUser}