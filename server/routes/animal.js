const Router = require('express').Router;
const { pessoa, animal, animal_x_lote } = require('../database/models');

const router = Router();

router.get('/', async (req, res) => {
  const findAnimal = await animal.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [pessoa],
  });
  return res.json(findAnimal);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const findAnimal = await animal.findOne({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: { id },
  });
  return res.json(findAnimal);
});

router.post('/', async (req, res) => {
  const {
    id_fazenda,
    no_animal,
    no_raca,
    sexo,
    vr_peso,
    dt_nascimento,
    fk_id_pessoa,
  } = req.body;
  await animal.create({
    id_fazenda,
    no_animal,
    no_raca,
    sexo,
    vr_peso,
    dt_nascimento,
    fk_id_pessoa,
  });
  return res.status(201).json();
});

router.put('/:id', async (req, res) => {
  const {
    id_fazenda,
    no_animal,
    no_raca,
    sexo,
    vr_peso,
    dt_nascimento,
    fk_id_pessoa,
  } = req.body;
  const { id } = req.params;
  await animal.update(
    {
      id_fazenda,
      no_animal,
      no_raca,
      sexo,
      vr_peso,
      dt_nascimento,
      fk_id_pessoa,
    },
    { where: { id } }
  );
  return res.status(200).json();
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await animal.destroy({ where: { id } });
  await animal_x_lote.destroy({ where: { fk_id_animal: id } });
  return res.status(204).json();
});

module.exports = router;
