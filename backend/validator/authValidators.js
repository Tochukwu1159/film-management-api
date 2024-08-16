import Joi from  'joi';

export const registerSchema = Joi.object({
  email: Joi.string().email().optional(),
  phoneNumber: Joi.string().pattern(/^[0-9]{10,15}$/).optional(),
  password: Joi.string().min(6).required(),
}).or('email', 'phoneNumber');


export const loginSchema = Joi.object({
  email: Joi.string().email(),
  phoneNumber: Joi.string(),
  password: Joi.string().required(),
});
