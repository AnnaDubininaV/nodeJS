const Sequelize = require('sequelize');

const sequelise = require('../utils/database');

const Cart = sequelise.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Cart;
