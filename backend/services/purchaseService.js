import Purchase from '../models/Purchase.js';
import Film from '../models/Film.js';

 const purchaseFilm = async ({ userId, filmId }) => {
console.log("bnnnhbnhbnyhbyh")
console.log(filmId, userId)
  try {

    return await Purchase.create({ userId, filmId });
  } catch (err) {
    throw new Error('Failed to create purchase: ' + err.message);
  }
};

const getPurchases = async (userId) => {
  return await Purchase.findAll({ where: { userId }, include: Film });
};

export default { purchaseFilm, getPurchases };
