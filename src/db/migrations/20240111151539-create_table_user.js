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
        name_user: Sequelize.STRING,
        hashedPassword: Sequelize.STRING,
        token_user: Sequelize.TEXT,
        cpf: Sequelize.STRING,
        email_institucional: Sequelize.STRING
      });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable('user');
  }
};
