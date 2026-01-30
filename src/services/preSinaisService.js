const PreSinaisModel = require('../models/preSinaisModel');

class PreSinaisService {
    static async buscarPorEvento(eventoId) {
        return await PreSinaisModel.findByEventoId(eventoId);
    }
}
module.exports = PreSinaisService;