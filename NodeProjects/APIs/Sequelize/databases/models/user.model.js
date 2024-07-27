import {conn} from './../dbConnection.js';
import {DataTypes} from 'sequelize';
let userModel=conn.define('user', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        allowNull: false, //nullable or not
        type: DataTypes.STRING(255)
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        // unique: true //unique or not
    },
    email: {
        type: DataTypes.STRING(300),
        allowNull: false,
        defaultValue: 'ahmed@yahoo.com' //default value
    },
    password:{
        type: DataTypes.STRING(300),
        allowNull: false
    },
    salary:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    
});
export {userModel};