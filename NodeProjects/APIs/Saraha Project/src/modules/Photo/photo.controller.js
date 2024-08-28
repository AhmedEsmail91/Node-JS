import photoModel from '../../../databases/models/photo.model.js';
const addPhoto=async(req, res,next) => {
    req.body.img=req.file.filename;
    await photoModel.insertMany(req.body);
    res.json({message:"success",fileData:req.body});
    // console.log(req.file);
    // res.json({message:"success",fileData:req.body});
    
}
const addPhotos=async(req, res,next) => {
    const images=req.files.map(file=>file.filename);// takes array
    const {title}=req.body
    await photoModel.insertMany({images,title,img:images[0]});
    res.json({message:"success",fileData:req.files});
    // res.json({message:"success",text_body:req.body});
    
}
const multiFieldUpload=async(req, res,next) => {
    // req.body.img=req.file.filename;
    // const images=req.files.map(file=>file.filename);
    // const {title}=req.body
    // await photoModel.insertMany({images,title,img:images[0]});
    // res.json({message:"success",fileData:req.body});
    // res.json({message:"success",fileData:req.file});
    const formData = req.body;
    const files = req.files;
    // Process the form data and files here
    res.json({message:"success", formData, files});
}
const allPhotos=async(req,res,next)=>{
    const data=await photoModel.find();
    const count=await photoModel.countDocuments({});
    res.json({count:count,data});
    
};
const deletePhoto=async(req,res,next)=>{
    const data=await photoModel.findByIdAndDelete(req.params.id);
    res.json(data);
};
import fs from 'fs';
import path from 'path'; 
const TruncateFolder=async(req,res,next)=>{
    
    await photoModel.deleteMany();
    const folderPath=path.join(process.cwd(),'uploads');
    (fs.readdir(folderPath, (err, files) => {
        if (err) throw err;
  
        for (const file of files) {
          const filePath = path.join(folderPath, file);
  
          // Check if it's a file or directory
          if (fs.lstatSync(filePath).isDirectory()) {
            // Recursively delete directories
            fs.rmdirSync(filePath, { recursive: true });
          } else {
            // Delete files
            fs.unlinkSync(filePath);
          }
        }
      }));
    res.json({message:"Truncated Successfully"});
}

export {addPhoto,addPhotos,multiFieldUpload,allPhotos,deletePhoto,TruncateFolder};