module.exports = (sequelize, DataTypes) => {
  const Branches = sequelize.define(
    'Branch',
    {
      branchName: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      pic_name: {
        type: DataTypes.STRING
      }
    },
  );

  return Branches;
};
