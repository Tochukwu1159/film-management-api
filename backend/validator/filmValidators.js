import Joi from 'joi';

export const createFilmSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().required(),
  releaseDate: Joi.date().required(),
  price: Joi.number().positive().required(),
  genreId: Joi.number().required(),
});
