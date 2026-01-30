const EstacaoModel = require('../models/estacaoModel');
const axios = require('axios');

class EstacaoService {
    
    // Regra para listar todas
    static async listarTodas() {
        return await EstacaoModel.findAll();
    }

    // Regra para criar nova estação (validação simples)
    static async criar(dados) {
        if (!dados.codigo_inmet || !dados.cidade || !dados.latitude || !dados.longitude) {
            throw new Error("Campos obrigatórios: codigo_inmet, cidade, latitude, longitude");
        }
        return await EstacaoModel.create(dados);
    }

    // Busca estação -> Busca no OpenMeteo -> Salva histórico
    static async buscarDadosExternos(id) {
        // 1. Busca os detalhes da estação no banco
        const estacao = await EstacaoModel.findById(id);
        if (!estacao) {
            throw new Error("Estação não encontrada");
        }

        // 2. Chama a API do OpenMeteo (lógica do index antigo)
        try {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${estacao.latitude}&longitude=${estacao.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,pressure_msl&timezone=auto`;
            
            const response = await axios.get(url, { timeout: 5000 });
            const current = response.data.current;

            // 3. Organiza os dados
            const dadosParaSalvar = {
                pressao: current.pressure_msl,
                velocidade_vento: current.wind_speed_10m,
                timestamp: current.time
            };

            // 4. Faz o Model salvar no histórico
            await EstacaoModel.saveDados(id, dadosParaSalvar);

            // 5. Retorna os dados
            return {
                estacao: estacao,
                dados_meteorologicos: current
            };

        } catch (error) {
            throw new Error("Erro na comunicação com OpenMeteo: " + error.message);
        }
    }
}

module.exports = EstacaoService;