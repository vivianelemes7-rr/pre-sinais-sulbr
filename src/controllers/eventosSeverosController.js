const EventosSeverosService = require('../services/eventosSeverosService');

class EventosSeverosController {
    static async getAll(req, res) {
        try {
            const eventos = await EventosSeverosService.getAll();
            res.json(eventos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const id = await EventosSeverosService.create(req.body);
            res.status(201).json({ message: 'Evento severo registrado!', id });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            await EventosSeverosService.delete(req.params.id);
            res.json({ message: 'Evento deletado.' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
module.exports = EventosSeverosController;