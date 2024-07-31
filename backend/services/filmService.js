import sequelize from '../database/db.js';
import cloudinary from '../helpers/cloudinary.js';
import Film from '../models/Film.js';
import Genre from '../models/Genre.js';

const createFilm = async ({ title, description, releaseDate, price, genreId, imageUrl }) => {
  try {
    // const uploadResult = await cloudinary.uploader.upload(image, {
    //   folder: 'films'
    // });
    const film = await Film.create({
      title,
      description,
      releaseDate,
      price,
      genreId,
      imageUrl
    });

    return film;
  } catch (err) {
    throw new Error('Error creating film: ' + err.message);
  }
};
const updateFilm = async (id, { title, description, releaseDate, price, genreId, imageUrl }) => {
  try {
    const film = await Film.findByPk(id);

    if (!film) {
      throw new Error('Film not found');
    }

    film.title = title || film.title;
    film.description = description || film.description;
    film.releaseDate = releaseDate || film.releaseDate;
    film.price = price || film.price;
    film.genreId = genreId || film.genreId;
    film.imageUrl = imageUrl || film.imageUrl;

    await film.save();
    return film;
  } catch (err) {
    throw new Error('Error updating film: ' + err.message);
  }
};

const getFilms = async () => {
  return await Film.findAll();
};

const deleteFilm = async (id) => {
  try {
    // Find the film
    const film = await Film.findByPk(id);

    if (!film) {
      throw new Error('Film not found');
    }
    await sequelize.query('DELETE FROM purchases WHERE filmId = ?', {
      replacements: [id],
      type: sequelize.QueryTypes.DELETE
    });

    // Delete the film
    await film.destroy();
  } catch (err) {
    throw new Error('Error deleting film: ' + err.message);
  }
};


export default { createFilm, getFilms, deleteFilm , updateFilm};
