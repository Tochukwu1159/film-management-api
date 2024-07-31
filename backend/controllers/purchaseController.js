import { purchaseFilmSchema } from '../validator/purchaseValidators.js';
import purchaseService from '../services/purchaseService.js';

const purchaseFilm = async (req, res) => {
  const { error } = purchaseFilmSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ status: false, message: 'Invalid request', error: error.details[0].message });
  }
  // Extract payment details if needed
  const { filmId } = req.body;
  const userId = req.user.payload.userId; // Assuming user ID is obtained from authenticated user

  try {
    const purchase = await purchaseService.purchaseFilm({ userId, filmId });
    res.status(201).json({ status: true, data: purchase });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Something went wrong', error: err.message });
  }
}

const getPurchases = async (req, res) => {
  try {
    console.log(req)
    const purchases = await purchaseService.getPurchases(req.user.payload.userId);
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default { purchaseFilm, getPurchases };
