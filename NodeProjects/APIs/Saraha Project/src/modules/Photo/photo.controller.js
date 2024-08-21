import photoModel from '../../../databases/models/photo.model.js';
const addPhoto=async(req, res) => {
    req.body.img=req.file.filename;
    await photoModel.insertMany(req.body);
    res.json({message:"success",fileData:{...req.body.img,...req.body.title}});
}
const allPhotos=async(req,res,next)=>{
    const data=await photoModel.find();
    res.json(data);
};
const deletePhoto=async(req,res,next)=>{
    const data=await photoModel.findByIdAndDelete(req.params.id);
    res.json(data);
};

export {addPhoto,allPhotos,deletePhoto};