const PreSinaisService = require('../services/preSinaisService');

class PreSinaisController {
    static async getAll(req, res) {
        try {
            const sinais = await PreSinaisService.getAll();
            res.json(sinais);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const id = await PreSinaisService.create(req.body);
            res.status(201).json({ message: 'Pré-sinal registrado com sucesso!', id });
        } catch (error) {
            // Se der erro de chave estrangeira (ID não existe), o banco avisa
            if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({ error: "Ciclone ou Estação informados não existem no banco." });
            }
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            await PreSinaisService.delete(req.params.id);
            res.json({ message: 'Pré-sinal removido.' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = PreSinaisController;