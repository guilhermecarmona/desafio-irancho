module.exports = {
  up: async (queryInterface, DataTypes) => {
    return queryInterface.createTable('animal', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      id_fazenda: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      no_animal: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      no_raca: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      sexo: {
        allowNull: false,
        type: DataTypes.STRING(1),
      },
      vr_peso: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
      dt_nascimento: {
        allowNull: false,
        type: DataTypes.DATE,
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
    return queryInterface.dropTable('animal');
  },
};
