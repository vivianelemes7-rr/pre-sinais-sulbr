const IndicesClimaticosService = require('../services/indicesClimaticosService');

class IndicesClimaticosController {
    static async getAll(req, res) {
        try {
            const indices = await IndicesClimaticosService.getAll();
            res.json(indices);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const id = await IndicesClimaticosService.create(req.body);
            res.status(201).json({ message: 'Índice criado com sucesso', id: id });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const id = req.params.id;
            await IndicesClimaticosService.delete(id);
            res.json({ message: 'Índice deletado com sucesso' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = IndicesClimaticosController;