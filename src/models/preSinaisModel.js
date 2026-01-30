const db = require('../config/database');

class PreSinaisModel {
    static async findByEventoId(eventoId) {
        const [rows] = await db.query(
            'SELECT * FROM pre_sinais WHERE evento_id = ?',
            [eventoId]
        );
        return rows;
    }
}

module.exports = PreSinaisModel;