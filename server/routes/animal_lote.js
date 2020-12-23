const Router = require('express').Router;
const { animal_lote, animal_x_lote } = require('../database/models');

const router = Router();

router.get('/', async (req, res) => {
  const findLote = await animal_lote.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
  return res.json(findLote);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const findLote = await animal_lote.findOne({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: { id },
  });
  return res.json(findLote);
});

router.post('/', async (req, res) => {
  const { no_lote, ds_lote } = req.body;
  await animal_lote.create({ no_lote, ds_lote });
  return res.status(201).json();
});

router.put('/:id', async (req, res) => {
  const { no_lote, ds_lote } = req.body;
  const { id } = req.params;
  await animal_lote.update({ no_lote, ds_lote }, { where: { id } });
  return res.status(200).json();
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await animal_lote.destroy({ where: { id } });
  await animal_x_lote.destroy({ where: { fk_id_lote: id } });
  return res.status(204).json();
});

module.exports = router;
