import {conn} from '../dbConnection.js';
import {DataTypes} from 'sequelize';
let postModel=conn.define('post', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        allowNull: false, //nullable or not
        type: DataTypes.STRING(255)
    },
});
export default {postModel};