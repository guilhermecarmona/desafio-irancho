module.exports = (sequelize, DataTypes) => {
  const animal = sequelize.define(
    'animal',
    {
      id_fazenda: DataTypes.INTEGER,
      no_animal: DataTypes.STRING,
      no_raca: DataTypes.STRING,
      sexo: DataTypes.STRING(1),
      vr_peso: DataTypes.DOUBLE,
      dt_nascimento: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      fk_id_pessoa: DataTypes.INTEGER,
    },
    {
      freezeTableName: true,
    }
  );

  animal.associate = models => {
    animal.belongsTo(models.pessoa, { foreignKey: 'fk_id_pessoa' });
    animal.belongsToMany(models.animal_lote, {
      through: 'animal_x_lote',
      foreignKey: 'fk_id_animal',
    });
  };

  return animal;
};
