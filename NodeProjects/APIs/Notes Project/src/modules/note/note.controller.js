import { noteModel } from "../../../databases/models/note.model.js";
import {auth} from "../../middlewares/auth.js";

const allNotes=async (req,res,next)=>{
    let notes=await noteModel.find({createdBy:req.customData.userID},{_id:0}).populate("createdBy",'email -_id name'); // find with no condition means get all the documents after joining the referenced document(s).
    res.send({message:"success",notes});   
}
const addNote=async (req,res,next)=>{
    let User_notes=await noteModel.insertMany(req.body);
    res.send({message:"success",User_notes});
};

const updateNote=async (req,res,next)=>{
    let note=await noteModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.send({message:"success",note});
}
const deleteNote=async (req,res,next)=>{
    let note=await noteModel.findByIdAndDelete(req.params.id);
    if (!note) return res.send({message:"note not found"});
    else res.send({message:"success"});
};
export {allNotes,addNote,updateNote,deleteNote};