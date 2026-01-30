const db = require('../config/database');

class CicloneModel {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM ciclone_evento');
        return rows;
    }
}

module.exports = CicloneModel;