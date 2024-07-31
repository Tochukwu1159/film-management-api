import Joi from 'joi';

export const purchaseFilmSchema = Joi.object({
  filmId: Joi.number().required(),
  userId:  Joi.number().required(),
});
