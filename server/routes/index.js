const Router = require('express').Router;
const pessoaRouter = require('./pessoa');
const animalRouter = require('./animal');
const loteRouter = require('./animal_lote');
const animalLoteRouter = require('./animal_x_lote');

const routes = Router();
routes.use('/pessoa', pessoaRouter);
routes.use('/animal', animalRouter);
routes.use('/lote', loteRouter);
routes.use('/animal-lote', animalLoteRouter);

module.exports = routes;
