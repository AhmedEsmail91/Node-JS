import express from 'express';
import messageController from './message.controller.js';
const router = express.Router();
import auth from './../../middlewares/auth.js';
import { validation } from '../../middlewares/validation.js';
import MSGSchema from './message.validation.js';

router.post('/messages/',validation(MSGSchema.addMessageSchema), messageController.sendMessage);
//in the following route we are validating the id of the user according to the schema. validation(schema)
router.get('/messages/:id',validation(MSGSchema.paramsVal),messageController.userMessages);
router.get('/shareProfile', messageController.shareProfile);
export default router;