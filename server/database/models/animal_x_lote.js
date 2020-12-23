module.exports = (sequelize, DataTypes) => {
  const animal_x_lote = sequelize.define(
    'animal_x_lote',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      fk_id_animal: DataTypes.INTEGER,
      fk_id_lote: DataTypes.INTEGER,
      dt_entrada: DataTypes.DATE,
      dt_saida: DataTypes.DATE,
      dt_ultima_movimentacao: DataTypes.DATE,
      ic_bezerro: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      freezeTableName: true,
    }
  );

  animal_x_lote.associate = models => {
    animal_x_lote.belongsTo(models.animal, { foreignKey: 'fk_id_animal' });
    animal_x_lote.belongsTo(models.animal_lote, { foreignKey: 'fk_id_lote' });
  };

  return animal_x_lote;
};
