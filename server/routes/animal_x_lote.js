const Router = require('express').Router;
const { animal, animal_lote, animal_x_lote } = require('../database/models');

const router = Router();

router.get('/', async (req, res) => {
  const findAnimalLote = await animal_x_lote.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [animal, animal_lote],
  });
  return res.json(findAnimalLote);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const findAnimalLote = await animal_x_lote.findOne({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: { id },
  });
  return res.json(findAnimalLote);
});

router.post('/', async (req, res) => {
  const {
    fk_id_animal,
    fk_id_lote,
    dt_entrada,
    dt_saida,
    dt_ultima_movimentacao,
    ic_bezerro,
  } = req.body;
  const animalEncontrado = await animal.findOne({
    where: { id: fk_id_animal },
  });
  const loteEncontrado = await animal_lote.findOne({
    where: { id: fk_id_lote },
  });
  if (!animalEncontrado || !loteEncontrado) {
    throw new Error();
  }
  await animal_x_lote.create({
    fk_id_animal,
    fk_id_lote,
    dt_entrada,
    dt_saida,
    dt_ultima_movimentacao,
    ic_bezerro,
  });
  return res.status(201).json();
});

router.put('/:id', async (req, res) => {
  const {
    fk_id_animal,
    fk_id_lote,
    dt_entrada,
    dt_saida,
    dt_ultima_movimentacao,
    ic_bezerro,
  } = req.body;
  const { id } = req.params;
  const animalEncontrado = await animal.findOne({
    where: { id: fk_id_animal },
  });
  const loteEncontrado = await animal_lote.findOne({
    where: { id: fk_id_lote },
  });
  if (!animalEncontrado || !loteEncontrado) {
    throw new Error();
  }
  await animal_x_lote.update(
    {
      fk_id_animal,
      fk_id_lote,
      dt_entrada,
      dt_saida,
      dt_ultima_movimentacao,
      ic_bezerro,
    },
    { where: { id } }
  );
  return res.status(200).json();
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await animal_x_lote.destroy({ where: { id } });
  return res.status(204).json();
});

module.exports = router;
