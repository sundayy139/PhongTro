'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Categories', {
            id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                autoIncrement: true,
            },
            code: {
                primaryKey: true,
                type: Sequelize.STRING
            },
            value: {
                type: Sequelize.STRING
            },
            title: {
                type: Sequelize.STRING
            },
            subtitle: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Categories');
    }
};