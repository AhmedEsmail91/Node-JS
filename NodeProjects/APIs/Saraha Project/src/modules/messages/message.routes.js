import express from 'express';
import messageController from './message.controller.js';
const router = express.Router();
import auth from './../../middlewares/auth.js';
// the sendMessage route doesn't need to be protected cause the actor will use it to send a message to another user (public).
// to give better UserExprerience we can add a middleware to check if the user is logged in or not.
// but in this case we won't cause we want to make it public for anyone.
router.post('/sendMessage/', messageController.sendMessage);
// the middleware (auth) will check if the token is valid or not.
router.get('/userMessages', auth,messageController.userMessages);
export default router;