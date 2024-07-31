import { noteModel } from "../../../databases/models/note.model.js";

const allNotes=async (req,res,next)=>{
    // populate method is used to get the data of the referenced document(s) instead of just the id(s) of the referenced document(s).
    // .populate(ref. col., cols. from another table)
    let notes=await noteModel.find({createdBy:req.params.id}).populate("createdBy","name email -_id"); // find with no condition means get all the documents after joining the referenced document(s).
    res.send({message:"success",notes});
}

const addNote=async (req,res,next)=>{
    let User_notes=await noteModel.insertMany(req.body);
    res.send({message:"success",User_notes});
};

const updateNote=async (req,res,next)=>{
    let note=await noteModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    //*--------------------------------------------------------Update_Methods--------------------------------------------------------
    // ---------Finding & [Update||Replace] Word---------
    // let x=await noteModel.findByIdAndUpdate(req.params.id,req.body,{new:true}); 
    // *returns instatance of old document by defualt but in case of addint new:true it returns the updated document.
    // let x=await noteModel.findOneAndUpdate({_id:req._id},req.body,{new:true});
    // *returns the updated document.
    // let x=await noteModel.findOneAndReplace({_id:req.params.id},req.body,{new:true});
    // *replaces the whole document with the new one which means you can totally remove some fields from the document.
    //-------------------------------------------------------------------------------------------------------------------
    // ---------Update Word---------
    // let x=await noteModel.updateOne({_id:req.params.id},req.body);
    // *updates the first document that matches the query and response with status of the operation (updateCount,etc...).
    // let x=await noteModel.updateMany({_id:req._id},req.body);
    // *updates all the documents that match the query.
    //-------------------------------------------------------------------------------------------------------------------
    // ---------Replace Word---------
    // let x=await noteModel.replaceOne({_id:req.id},req.body);
    // *replaces the whole document with the new one which means you can totally remove some fields from the document.
    //-------------------------------------------------------------------------------------------------------------------

    res.send({message:"success",note});
}
const deleteNote=async (req,res,next)=>{
    let note=await noteModel.findByIdAndDelete(req.params.id);
    if (!note) return res.send({message:"note not found"});
    
    //*--------------------------------------------------------Delete_Methods--------------------------------------------------------
    // ---------Find&Delete Word---------
    // let x=await noteModel.findByIdAndDelete(req.params.id);
    // *returns the deleted document.
    // let x=await noteModel.findOneAndDelete({_id:req.params.id});
    // *returns the deleted document.
    // ---------Delete Word---------
    // let x=await noteModel.deleteOne({_id:req.params.id});
    // *deletes the first document that matches the query and returns process status.
    // let x=await noteModel.deleteMany({_id:req.params.id});
    // *deletes all the documents that match the query and returns process status.


    else res.send({message:"success"});
};
export {allNotes,addNote,updateNote,deleteNote};