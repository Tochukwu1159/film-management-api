import Joi from 'joi';

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email(),
  phoneNumber: Joi.string().pattern(/^[0-9]{10,15}$/),
  address: Joi.string(),
}).xor('email', 'phoneNumber');

export const passwordSchema = Joi.object({
  oldPassword: Joi.string(),
  newPassword: Joi.string(),
});