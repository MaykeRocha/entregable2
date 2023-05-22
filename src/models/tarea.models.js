const db = require('../utils/database');
const { DataTypes } = require('sequelize');

const Tareas = db.define('tarea', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
   title: {
        type: DataTypes.STRING(25),
        allwNull: false,
    },
    description:{
        type: DataTypes.STRING(30),
        allowNull: false,
    },

    completed:{
        type: DataTypes.STRING(25),
        allwNull: false,
    }
});

module.exports = Tareas;