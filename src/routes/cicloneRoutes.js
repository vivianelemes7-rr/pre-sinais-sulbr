const express = require('express');
const CicloneController = require('../controllers/cicloneController');

const router = express.Router();

// GET http://localhost:3000/api/ciclones
router.get('/ciclones', CicloneController.listar);

module.exports = router;