const db = require('../config/database');

class EstacaoModel {
    // Listar todas as estações
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM estacoes');
        return rows;
    }

    // Buscar uma estação pelo ID
    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM estacoes WHERE id = ?', [id]);
        return rows[0];
    }

    // Criar nova estação
    static async create(estacao) {
        const { codigo_inmet, cidade, latitude, longitude } = estacao;
        const [result] = await db.query(
            'INSERT INTO estacoes (codigo_inmet, cidade, latitude, longitude) VALUES (?, ?, ?, ?)',
            [codigo_inmet, cidade, latitude, longitude]
        );
        return result.insertId;
    }

    // Salvar dados meteorológicos (referente à parte q salva o histórico)
    static async saveDados(estacaoId, dados) {
        const { pressao, velocidade_vento, timestamp } = dados;
        // Se o timestamp não vier, usa o momento atual
        const dataHora = timestamp ? timestamp : new Date();
        
        await db.query(
            'INSERT INTO dados_estacoes (estacao_id, data_hora, pressao_atmosferica, vento_velocidade) VALUES (?, ?, ?, ?)',
            [estacaoId, dataHora, pressao, velocidade_vento]
        );
    }
}

module.exports = EstacaoModel;