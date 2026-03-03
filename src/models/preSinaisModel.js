const PreSinaisModel = require('../models/preSinaisModel');

class PreSinaisService {
    static async getAll() {
        return await PreSinaisModel.findAll();
    }

    static async getByCiclone(cicloneId) {
        return await PreSinaisModel.findByCiclone(cicloneId);
    }

    static async create(dados) {
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

    static async buscarTempoReal() {
        const url = 'https://api.open-meteo.com/v1/forecast?latitude=-29.17&longitude=-51.52&current_weather=true';
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("Erro ao buscar dados na Open-Meteo");
        }
        
        const data = await response.json();
        return data.current_weather;
    }
}

module.exports = PreSinaisService;