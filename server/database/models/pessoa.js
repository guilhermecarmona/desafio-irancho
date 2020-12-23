module.exports = (sequelize, DataTypes) => {
  const pessoa = sequelize.define(
    'pessoa',
    {
      no_pessoa: DataTypes.STRING,
      no_email: DataTypes.STRING,
      endereco: DataTypes.STRING,
      sexo: DataTypes.STRING(1),
      ic_ativo: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      freezeTableName: true,
    }
  );

  pessoa.associate = models => {
    pessoa.hasMany(models.animal, { foreignKey: 'fk_id_pessoa' });
  };

  return pessoa;
};
