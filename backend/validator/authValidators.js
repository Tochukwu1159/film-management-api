import Joi from  'joi';

export const registerSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    dateOfBirth: Joi.date().required(),
    address: Joi.string(),
    role: Joi.string().valid('user', 'admin').required() 
});

  export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
