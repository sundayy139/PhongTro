'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Blog extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Blog.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'userBlogData' });
        }
    }
    Blog.init({
        title: DataTypes.STRING,
        image: DataTypes.STRING,
        descMarkdown: DataTypes.TEXT('LONG'),
        descHTML: DataTypes.TEXT('LONG'),
        userId: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Blog',
    });
    return Blog;
};