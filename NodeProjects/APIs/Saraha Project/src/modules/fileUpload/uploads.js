import multer from 'multer';
import {v4 as uuidv4} from 'uuid'; 
export const fileSingleUpload=(fieldname)=>{
    const storage=multer.diskStorage({
        destination:(req,file,cb)=>{
          
          cb(null,'uploads/');
        },
        filename:(req,file,cb)=>{
          
          cb(null,uuidv4()+'-'+file.originalname);
        }
      })
      
      //-------------------File Filter-----------------
      function fileFilter(req,file,cb){
        if(file.fieldname==='img'){
          if(file.mimetype.startsWith("image")){
            cb(null,true); // accept the file pass it to the storage.
          }else{
            cb(new AppError('File Type Not Supported',400),false);// refuse the file pass it to the storage and through an AppError(message,statusCode).
          }
        }
        if(file.fieldname==="name"){
          
        }
      }
//  const upload=multer({ dest: 'uploads/',storage:storage ,fileFilter:fileFilter});
//  return upload.single(fieldname);
    return multer({ dest: 'uploads/',storage:storage ,fileFilter:fileFilter}).single(fieldname);
}
export const filesUpload=(fieldname)=>{
    const storage=multer.diskStorage({
        destination:(req,file,cb)=>{
          
          cb(null,'uploads/');
        },
        filename:(req,file,cb)=>{
          
          cb(null,uuidv4()+'-'+file.originalname);
        }
      })
      
      //-------------------File Filter-----------------
      function fileFilter(req,file,cb){
        if(file.fieldname==='img'){
          if(file.mimetype.startsWith("image")){
            cb(null,true); // accept the file pass it to the storage.
          }else{
            cb(new AppError('File Type Not Supported',400),false);// refuse the file pass it to the storage and through an AppError(message,statusCode).
          }
        }
        if(file.fieldname==="name"){
          
        }
      }
//  const upload=multer({ dest: 'uploads/',storage:storage ,fileFilter:fileFilter});
//  return upload.single(fieldname);
    return multer({ dest: 'uploads/',storage:storage ,fileFilter:fileFilter}).array(fieldname);
}