import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

const User = sequelize.define('User', {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  name: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  email: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true 
  },
  password: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  dateOfBirth: { 
    type: DataTypes.DATEONLY, 
    allowNull: false 
  },
  address: { 
    type: DataTypes.STRING 
  },
  role: { 
    type: DataTypes.ENUM('user', 'admin'), 
    defaultValue: 'user' 
  }
}, {
  timestamps: true,
});

export default User;
