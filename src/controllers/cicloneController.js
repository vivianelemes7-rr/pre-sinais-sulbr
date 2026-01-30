const CicloneService = require('../services/cicloneService');

class CicloneController {
    static async listar(req, res) {
        try {
            const ciclones = await CicloneService.listarTodos();
            res.json(ciclones);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = CicloneController;