const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    x: {
        type: DataTypes.FLOAT,
        defaultValue: 50
    },
    y: {
        type: DataTypes.FLOAT,
        defaultValue: 50
    },
    isUserOwned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    recipientName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    views: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    chats: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

module.exports = Product;
