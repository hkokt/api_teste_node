'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable('user',
      {
        id_user: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        username: {
          type: Sequelize.STRING,
          unique: true
        },
        hashed_password: Sequelize.STRING,
        token: Sequelize.TEXT,
      });
  },
  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable('user');
  }
};
