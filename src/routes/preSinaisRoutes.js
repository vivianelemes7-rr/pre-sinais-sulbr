const express = require('express');
const PreSinaisController = require('../controllers/preSinaisController');

const router = express.Router();

router.get('/', PreSinaisController.getAll);
router.get('/ciclone/:id', PreSinaisController.getByCiclone); // <--- Rota Nova!
router.post('/', PreSinaisController.create);
router.delete('/:id', PreSinaisController.delete);

module.exports = router;