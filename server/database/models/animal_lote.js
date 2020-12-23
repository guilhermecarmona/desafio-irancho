module.exports = (sequelize, DataTypes) => {
  const animal_lote = sequelize.define(
    'animal_lote',
    {
      no_lote: DataTypes.STRING,
      ds_lote: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      freezeTableName: true,
    }
  );

  animal_lote.associate = models => {
    animal_lote.belongsToMany(models.animal, {
      through: 'animal_x_lote',
      foreignKey: 'fk_id_lote',
    });
  };

  return animal_lote;
};
