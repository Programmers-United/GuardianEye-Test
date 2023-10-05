const { DataTypes} = require('sequelize');
const sequelize = require('../database/connectDataBase');

const Point = sequelize.define('Point', {
    //Attributes of the table
    id:{
        type: DataTypes.UUID,
        defaultValue: sequelize.UUIDV4,
        primaryKey: true
    },
    title:{
        type: DataTypes.STRING,
        primaryKey: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data:{
        type: DataTypes.DATE,
        allowNull: false
    },
    time:{
        type: DataTypes.TIME,
        allowNull: false
    },
    geometric:{
        type: DataTypes.GEOMETRY,
        allowNull: false
    }
});

module.exports = Point;