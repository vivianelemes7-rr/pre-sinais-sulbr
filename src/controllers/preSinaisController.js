const PreSinaisService = require('../services/preSinaisService');

class PreSinaisController {
    static async buscar(req, res) {
        try {
            const { evento_id } = req.params;
            const sinais = await PreSinaisService.buscarPorEvento(evento_id);
            
            // Mantendo o formato original da sua resposta
            res.json({
                evento_id: evento_id,
                sinais: sinais
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PreSinaisController;