module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Branches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      branchName: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Branches')
  }
};
