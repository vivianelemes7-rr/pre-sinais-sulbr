const EventosSeverosModel = require('../models/eventosSeverosModel');

class EventosSeverosService {
    static async getAll() {
        return await EventosSeverosModel.findAll();
    }

    static async create(dados) {
        if (!dados.tipo_evento || !dados.data_ocorrencia) {
            throw new Error("Tipo do evento e Data são obrigatórios.");
        }
        return await EventosSeverosModel.create(dados);
    }

    static async delete(id) {
        const deleted = await EventosSeverosModel.delete(id);
        if (deleted === 0) throw new Error("Evento não encontrado.");
        return deleted;
    }
}
module.exports = EventosSeverosService;