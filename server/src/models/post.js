'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Post.belongsTo(models.Attribute, { foreignKey: 'attributeId', targetKey: 'id', as: 'attributesData' });
            Post.belongsTo(models.Image, { foreignKey: 'imageId', targetKey: 'id', as: 'imagesData' });
            Post.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'userData' });
        }
    }
    Post.init({
        title: DataTypes.STRING,
        star: DataTypes.STRING,
        labelCode: DataTypes.STRING,
        address: DataTypes.STRING,
        attributeId: DataTypes.STRING,
        categoryCode: DataTypes.STRING,
        description: DataTypes.TEXT,
        userId: DataTypes.STRING,
        overviewId: DataTypes.STRING,
        imageId: DataTypes.STRING,
        priceCode: DataTypes.STRING,
        acreageCode: DataTypes.STRING,
        provinceCode: DataTypes.STRING,
        statusCode: DataTypes.STRING,
        priceNumber: DataTypes.FLOAT,
        acreageNumber: DataTypes.FLOAT,
    }, {
        sequelize,
        modelName: 'Post',
    });
    return Post;
};