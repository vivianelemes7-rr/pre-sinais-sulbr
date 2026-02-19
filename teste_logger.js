const logger = require('./src/logs/logger'); // Importa módulo novo

console.log("--- Iniciando Teste do Logger ---");

// Teste 1: Informação (Aparece no console e no sistema.log)
logger.info("Isso é uma mensagem informativa de teste. Tudo normal!");

// Teste 2: Aviso (em amarelo, no console)
logger.warn("Cuidado! Isso é um aviso de teste. Algo requer atenção.");

// Teste 3: Erro (Vermelho no console e GRAVA no erros.log)
logger.error("ERRO SIMULADO! Isso é um teste de falha crítica.");

console.log("--- Fim do Teste (Verifique os arquivos na pasta src/logs) ---");