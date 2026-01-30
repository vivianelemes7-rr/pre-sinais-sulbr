const express = require('express');
const EstacaoController = require('../controllers/estacaoController');

const router = express.Router();

// Rota para listar todas as estações
// GET http://localhost:3000/api/estacoes
router.get('/estacoes', EstacaoController.listar);

// Rota para criar estação
// POST http://localhost:3000/api/estacoes
router.post('/estacoes', EstacaoController.criar);

// Rota para buscar dados do OpenMeteo e salvar
// GET http://localhost:3000/api/dados-estacao/:id
router.get('/dados-estacao/:id', EstacaoController.buscarDados);

module.exports = router;