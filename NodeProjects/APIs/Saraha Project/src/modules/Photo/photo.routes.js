import express from 'express';
const router=express.Router();
import { fileSingleUpload } from './../fileUpload/uploads.js';
import {addPhoto, allPhotos, deletePhoto} from './photo.controller.js';
router.post('/photo', fileSingleUpload('img'),addPhoto);
router.get('/all-photos',allPhotos);
router.delete("/photo/:id",deletePhoto);
export default router;