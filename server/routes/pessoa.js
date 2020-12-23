const Router = require('express').Router;
const { pessoa } = require('../database/models');

const router = Router();

router.get('/', async (req, res) => {
  const findPessoa = await pessoa.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
  return res.json(findPessoa);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const findPessoa = await pessoa.findOne({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: { id },
  });
  return res.json(findPessoa);
});

router.post('/', async (req, res) => {
  const { no_pessoa, no_email, endereco, sexo, ic_ativo } = req.body;
  await pessoa.create({ no_pessoa, no_email, endereco, sexo, ic_ativo });
  return res.status(201).json();
});

router.put('/:id', async (req, res) => {
  const { no_pessoa, no_email, endereco, sexo, ic_ativo } = req.body;
  const { id } = req.params;
  await pessoa.update(
    { no_pessoa, no_email, endereco, sexo, ic_ativo },
    { where: { id } }
  );
  return res.status(200).json();
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await pessoa.destroy({ where: { id } });
  return res.status(204).json();
});

module.exports = router;
