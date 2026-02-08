const db = require('../config/database');

class PreSinaisModel {
    // Busca todos os sinais, trazendo a Classificação do Ciclone e a Cidade da Estação
    static async findAll() {
        const query = `
            SELECT 
                p.*, 
                c.classificacao AS nome_ciclone, 
                e.cidade AS nome_estacao 
            FROM pre_sinais p
            JOIN ciclone_evento c ON p.ciclone_id = c.id
            JOIN estacoes e ON p.estacao_id = e.id
        `;
        const [rows] = await db.query(query);
        return rows;
    }

    static async create(dados) {
        const { ciclone_id, estacao_id, tipo_sinal, valor_medido, data_hora_registro, tempo_antecedencia_horas } = dados;
        
        const [result] = await db.query(
            `INSERT INTO pre_sinais 
            (ciclone_id, estacao_id, tipo_sinal, valor_medido, data_hora_registro, tempo_antecedencia_horas) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [ciclone_id, estacao_id, tipo_sinal, valor_medido, data_hora_registro, tempo_antecedencia_horas]
        );
        return result.insertId;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM pre_sinais WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = PreSinaisModel;