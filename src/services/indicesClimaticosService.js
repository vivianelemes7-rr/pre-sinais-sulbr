const IndicesClimaticosModel = require('../models/indicesClimaticosModel');

class IndicesClimaticosService {
    static async getAll() {
        return await IndicesClimaticosModel.findAll();
    }

    static async create(dados) {
        // Validação simples
        if (!dados.nome || !dados.valor) {
            throw new Error("Nome e Valor são obrigatórios.");
        }
        
        return await IndicesClimaticosModel.create(dados);
    }

    static async delete(id) {
        const deletedRows = await IndicesClimaticosModel.delete(id);
        if (deletedRows === 0) {
            throw new Error("Índice não encontrado para deletar.");
        }
        return deletedRows;
    }
}

module.exports = IndicesClimaticosService;