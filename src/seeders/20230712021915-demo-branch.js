'use strict';

/** @type {import('sequelize-cli').Migration} */
// sequelize-cli seed:generate --name demo-user
// sequelize-cli db:seed:all
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("branches", [
      {
        branchName: 'BSD',
        address: 'GOP 9',
        createdAt: "2023-01-27 07:52:27",
        updatedAt: "2023-01-27 07:52:27"
      },
      {
        branchName: 'Yogyakarta',
        address: 'Pacific Building',
        createdAt: "2023-01-27 07:52:27",
        updatedAt: "2023-01-27 07:52:27"
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("branch", null, {})
  }
};
