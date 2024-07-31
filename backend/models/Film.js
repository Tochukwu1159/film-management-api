import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

const Film = sequelize.define('Film', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  imageUrl: { type: DataTypes.TEXT },
  releaseDate: { type: DataTypes.DATEONLY },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  genreId: { type: DataTypes.INTEGER, allowNull: false },
}, {
  timestamps: true,
});

export default Film;
