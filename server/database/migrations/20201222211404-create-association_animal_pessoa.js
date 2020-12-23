module.exports = {
  up: async (queryInterface, DataTypes) => {
    return queryInterface.addColumn('animal', 'fk_id_pessoa', {
      type: DataTypes.INTEGER,
      references: {
        model: 'pessoa',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async queryInterface => {
    return queryInterface.removeColumn('animal', 'fk_id_pessoa');
  },
};
