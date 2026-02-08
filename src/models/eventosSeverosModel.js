const db = require('../config/database');

class EventosSeverosModel {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM eventos_climaticos_severos');
        return rows;
    }

    static async create(dados) {
        const { tipo_evento, intensidade, descricao, data_ocorrencia, latitude, longitude } = dados;
        const [result] = await db.query(
            'INSERT INTO eventos_climaticos_severos (tipo_evento, intensidade, descricao, data_ocorrencia, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?)',
            [tipo_evento, intensidade, descricao, data_ocorrencia, latitude, longitude]
        );
        return result.insertId;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM eventos_climaticos_severos WHERE id = ?', [id]);
        return result.affectedRows;
    }
}
module.exports = EventosSeverosModel;