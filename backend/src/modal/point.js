const { DataTypes} = require('sequelize');
const sequelize = require('../database/connectDataBase');

const Point = sequelize.define('Point', {
    //Attributes of the table
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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

async function Synchronize(){
    await Point.sync();
    console.log('Synchronize with database');
}

Synchronize();

module.exports = Point;