import { createFilmSchema } from '../validator/filmValidators.js';
import filmService from '../services/filmService.js';
import { uploadToCloudinary } from '../middlewares/uploadToCloudinary.js';

const createFilm = async (req, res) => {

  const { error } = createFilmSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  if (!req.files || !req.files.imageFile) {
    return res.status(400).json({ message: 'No image file provided' });
  }

  try {
    const result = await uploadToCloudinary(req.files.imageFile.data);
    const filmData = { ...req.body, imageUrl: result.secure_url };
    const film = await filmService.createFilm(filmData);

    res.status(201).json(film);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateFilm = async (req, res) => {
  try {
    let imageUrl = req.body.imageUrl;

    if (req.files && req.files.imageFile) {
      const result = await uploadToCloudinary(req.files.imageFile.data);
      imageUrl = result.secure_url;
    }

    const filmData = { ...req.body, imageUrl };
    const film = await filmService.updateFilm(req.params.id, filmData);

    res.json(film);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



const getFilms = async (req, res) => {
  try {
    const films = await filmService.getFilms();
    res.json(films);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteFilm = async (req, res) => {
  try {
    await filmService.deleteFilm(req.params.id);
    res.status(204).send(); // No content
  } catch (err) {
    res.status(500).json({ message: err.message });
  }}

export default { createFilm, getFilms , deleteFilm, updateFilm};
