const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../ecobid.sqlite'),
    logging: false // Disable logging for cleaner console
});

module.exports = sequelize;
