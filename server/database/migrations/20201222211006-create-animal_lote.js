module.exports = {
  up: async (queryInterface, DataTypes) => {
    return queryInterface.createTable('animal_lote', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      no_lote: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      ds_lote: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: async queryInterface => {
    return queryInterface.dropTable('animal_lote');
  },
};
