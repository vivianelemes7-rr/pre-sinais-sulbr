const EstacaoService = require('../services/estacaoService');

class EstacaoController {
    
    // GET /api/estacoes
    static async listar(req, res) {
        try {
            const estacoes = await EstacaoService.listarTodas();
            res.json(estacoes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // POST /api/estacoes
    static async criar(req, res) {
        try {
            const novoId = await EstacaoService.criar(req.body);
            res.status(201).json({ 
                message: "Estação criada com sucesso",
                id: novoId,
                ...req.body 
            });
        } catch (error) {
            // Se for erro de validação (campos faltando), retorna 400
            res.status(400).json({ error: error.message });
        }
    }

    // GET /api/dados-estacao/:id
    static async buscarDados(req, res) {
        try {
            const { id } = req.params;
            const resultado = await EstacaoService.buscarDadosExternos(id);
            res.json(resultado);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = EstacaoController;