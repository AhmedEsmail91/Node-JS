import express from 'express';
const router=express.Router();
import { fileSingleUpload, multiFilesUpload,multiFiledsUpload } from './../fileUpload/uploads.js';
import {addPhoto,addPhotos,multiFieldUpload, allPhotos, deletePhoto, TruncateFolder} from './photo.controller.js';
router.post('/photo', fileSingleUpload('img'),addPhoto);
// Trying the Files in Array to be uploaded.
router.post('/addPhotos', multiFilesUpload('img'),addPhotos);
// Trying the Files in Array in Diff. Fields to be uploaded.
// router.post('/multiFeildUpload',multiFieldUpload);
router.get('/all-photos',allPhotos);
router.delete("/photo/:id",deletePhoto);
router.delete("/photo/",TruncateFolder);
export default router;