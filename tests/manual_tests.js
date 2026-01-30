const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

// cores console
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

// tratamento de erro
async function request(method, endpoint, data = null) {
    try {
        const config = { timeout: 10000 };
        let response;
        
        if (method === 'GET') {
            response = await axios.get(`${BASE_URL}${endpoint}`, config);
        } else if (method === 'POST') {
            response = await axios.post(`${BASE_URL}${endpoint}`, data, config);
        }
        
        return { success: true, data: response.data, status: response.status };
    } catch (error) {
        return { 
            success: false, 
            error: error.message,
            status: error.response?.status || 'N/A'
        };
    }
}

function printResult(testName, success, details = '') {
    const icon = success ? '✅' : '❌';
    const color = success ? colors.green : colors.red;
    console.log(`${color}${icon} ${testName}${colors.reset}${details ? ' - ' + details : ''}`);
}

function printSection(title) {
    console.log(`\n${colors.cyan}${'='.repeat(60)}${colors.reset}`);
    console.log(`${colors.blue}${title}${colors.reset}`);
    console.log(`${colors.cyan}${'='.repeat(60)}${colors.reset}\n`);
}

async function runTests() {
    console.log(`\n${colors.yellow}🧪 INICIANDO TESTES DO PROJETO PRÉ-SINAIS DE CICLOGÊNESE${colors.reset}`);
    console.log(`${colors.yellow}Timestamp: ${new Date().toLocaleString('pt-BR')}${colors.reset}\n`);
    
    let totalTests = 0;
    let passedTests = 0;
    
    // Teste 1
    printSection('1. TESTE DE CONEXÃO COM SERVIDOR');
    totalTests++;
    const healthCheck = await request('GET', '/health');
    if (healthCheck.success) {
        printResult('Health Check', true, `Status: ${healthCheck.status}`);
        passedTests++;
    } else {
        printResult('Health Check', false, `Erro: ${healthCheck.error}`);
        console.log(`${colors.red}⚠️  Certifique-se de que o servidor está rodando: npm start${colors.reset}`);
        console.log(`${colors.red}⚠️  E que o MySQL está rodando com o banco pré-sinais_sulbr criado: npm run setup${colors.reset}\n`);
        return; // parar os testes se o servidor não responder
    }
    
    // Teste 2: Listar estações
    printSection('2. TESTE DE BANCO DE DADOS - ESTAÇÕES');
    totalTests++;
    const estacoes = await request('GET', '/estacoes');
    if (estacoes.success && Array.isArray(estacoes.data)) {
        printResult('GET /estacoes', true, `${estacoes.data.length} estações encontradas`);
        passedTests++;
        
        if (estacoes.data.length === 0) {
            console.log(`${colors.yellow}⚠️  Nenhuma estação encontrada. Criando estações de teste...${colors.reset}\n`);
            
            // estações de teste
            const estacoesTeste = [
                { codigo_inmet: 'A001', cidade: 'Porto Alegre', latitude: -30.0277, longitude: -51.5005 },
                { codigo_inmet: 'A002', cidade: 'Curitiba', latitude: -25.4284, longitude: -49.2733 },
                { codigo_inmet: 'A003', cidade: 'Florianópolis', latitude: -27.5965, longitude: -48.5494 }
            ];
            
            for (const estacao of estacoesTeste) {
                const result = await request('POST', '/estacoes', estacao);
                if (result.success) {
                    console.log(`  ✓ Estação criada: ${estacao.cidade} (ID: ${result.data.id})`);
                } else {
                    console.log(`  ✗ Erro ao criar estação ${estacao.cidade}: ${result.error}`);
                }
            }
        }
    } else {
        printResult('GET /estacoes', false, `Erro: ${estacoes.error}`);
    }
    
    // Teste 3: Listar ciclones
    printSection('3. TESTE DE BANCO DE DADOS - CICLONES');
    totalTests++;
    const ciclones = await request('GET', '/ciclones');
    if (ciclones.success && Array.isArray(ciclones.data)) {
        printResult('GET /ciclones', true, `${ciclones.data.length} ciclones encontrados`);
        passedTests++;
        
        if (ciclones.data.length > 0) {
            console.log(`\n${colors.cyan}Ciclones registrados:${colors.reset}`);
            ciclones.data.forEach((ciclone, index) => {
                console.log(`  ${index + 1}. ${ciclone.classificacao || 'N/A'} (${ciclone.data_inicio})`);
            });
        }
    } else {
        printResult('GET /ciclones', false, `Erro: ${ciclones.error}`);
    }
    
    // Teste 4: Integração com OpenMeteo
    printSection('4. TESTE DE INTEGRAÇÃO COM API OPENMETEO');
    
    // verificar se há estações
    const estacoesList = await request('GET', '/estacoes');
    
    if (estacoesList.success && estacoesList.data.length > 0) {
        const primeiraEstacao = estacoesList.data[0];
        totalTests++;
        
        console.log(`${colors.cyan}Testando com estação: ${primeiraEstacao.cidade}${colors.reset}`);
        console.log(`Coordenadas: ${primeiraEstacao.latitude}, ${primeiraEstacao.longitude}\n`);
        
        const dadosEstacao = await request('GET', `/dados-estacao/${primeiraEstacao.id}`);
        
        if (dadosEstacao.success) {
            printResult('Buscar dados meteorológicos (OpenMeteo)', true);
            passedTests++;
            
            console.log(`\n${colors.cyan}Dados meteorológicos recebidos:${colors.reset}`);
            const dados = dadosEstacao.data.dados_meteorologicos;
            console.log(`  🌡️  Temperatura: ${dados.temperatura}°C`);
            console.log(`  💧 Umidade: ${dados.umidade}%`);
            console.log(`  💨 Velocidade do vento: ${dados.velocidade_vento} km/h`);
            console.log(`  🔽 Pressão: ${dados.pressao} hPa`);
            console.log(`  ⏰ Timestamp: ${dados.timestamp}`);
        } else {
            printResult('Buscar dados meteorológicos (OpenMeteo)', false, `Erro: ${dadosEstacao.error}`);
        }
    } else {
        console.log(`${colors.yellow}⚠️  Nenhuma estação disponível para testar integração com OpenMeteo${colors.reset}`);
    }
    
    // Teste 5: Pré-sinais
    printSection('5. TESTE DE PRÉ-SINAIS');
    
    if (ciclones.success && ciclones.data.length > 0) {
        const primeiroCiclone = ciclones.data[0];
        totalTests++;
        
        const sinais = await request('GET', `/pre-sinais/${primeiroCiclone.id}`);
        
        if (sinais.success) {
            printResult('GET /pre-sinais/:evento_id', true, `${sinais.data.sinais.length} sinais encontrados`);
            passedTests++;
        } else {
            printResult('GET /pre-sinais/:evento_id', false, `Erro: ${sinais.error}`);
        }
    } else {
        console.log(`${colors.yellow}⚠️  Nenhum ciclone disponível para testar pré-sinais${colors.reset}`);
    }
    
    // Resumo testes
    printSection('📊 RESUMO DOS TESTES');
    console.log(`${colors.green}✅ Testes passados: ${passedTests}/${totalTests}${colors.reset}`);
    
    if (passedTests === totalTests) {
        console.log(`${colors.green}🎉 TODOS OS TESTES PASSARAM!${colors.reset}\n`);
    } else {
        console.log(`${colors.yellow}⚠️  ${totalTests - passedTests} teste(s) falharam${colors.reset}\n`);
    }
    
    // Instruções
    printSection('📋 PRÓXIMOS PASSOS');
    console.log(`${colors.cyan}1. Verifique se o servidor está rodando:${colors.reset}`);
    console.log(`   npm start\n`);
    console.log(`${colors.cyan}2. Certifique-se de que o banco de dados está configurado:${colors.reset}`);
    console.log(`   npm run setup\n`);
    console.log(`${colors.cyan}3. Execute os testes novamente:${colors.reset}`);
    console.log(`   npm test\n`);
    console.log(`${colors.cyan}4. Endpoints disponíveis:${colors.reset}`);
    console.log(`   GET  /api/health              - Verificar saúde do servidor`);
    console.log(`   GET  /api/estacoes            - Listar todas as estações`);
    console.log(`   POST /api/estacoes            - Criar nova estação`);
    console.log(`   GET  /api/dados-estacao/:id   - Obter dados meteorológicos de uma estação`);
    console.log(`   GET  /api/ciclones            - Listar ciclones registrados`);
    console.log(`   GET  /api/pre-sinais/:id      - Obter pré-sinais de um evento\n`);
}

// Executar testes
runTests().catch(error => {
    console.error(`${colors.red}❌ Erro ao executar testes: ${error.message}${colors.reset}`);
    process.exit(1);
});
