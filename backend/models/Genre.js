import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

const Genre = sequelize.define('Genre', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
}, {
  timestamps: true,
});

export default Genre;
