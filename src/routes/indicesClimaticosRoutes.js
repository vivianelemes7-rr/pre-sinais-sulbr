const express = require('express');
const IndicesClimaticosController = require('../controllers/indicesClimaticosController');

const router = express.Router();

router.get('/', IndicesClimaticosController.getAll);
router.post('/', IndicesClimaticosController.create);
router.delete('/:id', IndicesClimaticosController.delete);

module.exports = router;