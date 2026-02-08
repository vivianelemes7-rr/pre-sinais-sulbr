const PreSinaisModel = require('../models/preSinaisModel');

class PreSinaisService {
    static async getAll() {
        return await PreSinaisModel.findAll();
    }

    static async create(dados) {
        // Validação básica: a qual ciclone e qual estação isso pertence?
        if (!dados.ciclone_id || !dados.estacao_id || !dados.tipo_sinal) {
            throw new Error("Ciclone ID, Estação ID e Tipo de Sinal são obrigatórios.");
        }
        return await PreSinaisModel.create(dados);
    }

    static async delete(id) {
        const deleted = await PreSinaisModel.delete(id);
        if (deleted === 0) throw new Error("Pré-sinal não encontrado.");
        return deleted;
    }
}

module.exports = PreSinaisService;