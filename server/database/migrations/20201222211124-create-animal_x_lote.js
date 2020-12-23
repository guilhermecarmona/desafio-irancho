module.exports = {
  up: async (queryInterface, DataTypes) => {
    return queryInterface.createTable('animal_x_lote', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      fk_id_animal: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      fk_id_lote: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      dt_entrada: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      dt_saida: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      dt_ultima_movimentacao: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      ic_bezerro: {
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
    return queryInterface.dropTable('animal_x_lote');
  },
};
