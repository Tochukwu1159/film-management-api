import { DataTypes } from 'sequelize';
import sequelize from  '../database/db.js';
import User from './user.js';
import Film from './Film.js';

const Purchase = sequelize.define('Purchase', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
  filmId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Film, key: 'id' } },
  purchaseDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  timestamps: false,
});

Purchase.belongsTo(User, { foreignKey: 'userId' });
Purchase.belongsTo(Film, { foreignKey: 'filmId' });

export default Purchase;
