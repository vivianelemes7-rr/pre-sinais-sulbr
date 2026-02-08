const db = require('../config/database');

class IndicesClimaticosModel {
    // Listar todos
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM indices_climaticos');
        return rows;
    }

    // Criar novo
    static async create(dados) {
        const { nome, valor, data_medicao } = dados;
        const [result] = await db.query(
            'INSERT INTO indices_climaticos (nome, valor, data_medicao) VALUES (?, ?, ?)',
            [nome, valor, data_medicao]
        );
        return result.insertId;
    }

    // Deletar
    static async delete(id) {
        const [result] = await db.query('DELETE FROM indices_climaticos WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = IndicesClimaticosModel;