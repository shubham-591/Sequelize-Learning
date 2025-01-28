'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('CarTags', {
      carId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cars',
          key: 'id'
        }
      },
      tagId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tags',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }  
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('CarTags');
  }
};
