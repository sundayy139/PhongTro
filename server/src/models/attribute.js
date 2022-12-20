'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Atrribute extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Atrribute.init({
        price: DataTypes.STRING,
        acreage: DataTypes.STRING,
        published: DataTypes.STRING,
        hastag: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Atrribute',
    });
    return Atrribute;
};