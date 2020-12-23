module.exports = {
  up: async (queryInterface, DataTypes) => {
    return queryInterface.createTable('pessoa', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      no_pessoa: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      no_email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      endereco: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      sexo: {
        allowNull: false,
        type: DataTypes.STRING(1),
      },
      ic_ativo: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
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
    return queryInterface.dropTable('pessoa');
  },
};
