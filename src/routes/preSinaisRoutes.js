const express = require('express');
const PreSinaisController = require('../controllers/preSinaisController');

const router = express.Router();

router.get('/tempo-real', PreSinaisController.buscarTempoReal);
router.get('/', PreSinaisController.getAll);
router.get('/ciclone/:id', PreSinaisController.getByCiclone);
router.post('/', PreSinaisController.create);
router.delete('/:id', PreSinaisController.delete);

module.exports = router;