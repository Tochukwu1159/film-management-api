import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('film_sales_db', 'root', 'tochukwu', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
