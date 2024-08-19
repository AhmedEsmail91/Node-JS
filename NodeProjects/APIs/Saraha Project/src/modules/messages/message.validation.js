import Joi from 'joi';
const addMessageSchema = Joi.object({
    textMessage: Joi.string().min(2).max(200).required(),
    // receivedId: Joi.string().regex('^[0-9a-fA-F]+$').required() // or simply:
    receivedId: Joi.string().hex().length(24).required()
});
const paramsVal=Joi.object({
    id: Joi.string().hex().length(24).required()
});
export default { addMessageSchema ,paramsVal};