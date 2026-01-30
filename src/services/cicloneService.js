const CicloneModel = require('../models/cicloneModel');

class CicloneService {
    static async listarTodos() {
        return await CicloneModel.findAll();
    }
}

module.exports = CicloneService;