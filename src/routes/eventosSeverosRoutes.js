const express = require('express');
const EventosSeverosController = require('../controllers/eventosSeverosController');

const router = express.Router();

router.get('/', EventosSeverosController.getAll);
router.post('/', EventosSeverosController.create);
router.delete('/:id', EventosSeverosController.delete);

module.exports = router;