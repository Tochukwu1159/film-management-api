import Joi from 'joi';

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email(),
  address: Joi.string(),
});
