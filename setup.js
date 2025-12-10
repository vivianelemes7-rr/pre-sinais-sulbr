const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
};

async function setupProjeto() {
    let connection;
    try {
    
        console.log('Conectando ao MySQL...');
        connection = await mysql.createConnection(dbConfig);
        console.log('✅ Conectado!');

        console.log('Criando banco de dados...');
        await connection.query(`CREATE DATABASE IF NOT EXISTS pre_sinais_sulbr`);
        await connection.query(`USE pre_sinais_sulbr`);
        console.log('Banco "pre_sinais_sulbr" criado/selecionado.');

        
        const tabelas = [
            `CREATE TABLE IF NOT EXISTS ciclone_evento (
                id INT AUTO_INCREMENT PRIMARY KEY,
                data_inicio DATETIME NOT NULL,
                data_fim DATETIME,
                classificacao VARCHAR(50),
                impacto_observado TEXT
            )`,
            `CREATE TABLE IF NOT EXISTS estacoes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                codigo_inmet VARCHAR(20) UNIQUE,
                cidade VARCHAR(100),
                latitude FLOAT,
                longitude FLOAT
            )`,
            `CREATE TABLE IF NOT EXISTS dados_estacoes (
                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                estacao_id INT,
                data_hora DATETIME,
                pressao_atmosferica FLOAT,
                vento_velocidade FLOAT,
                FOREIGN KEY (estacao_id) REFERENCES estacoes(id)
            )`,
            `CREATE TABLE IF NOT EXISTS pre_sinais (
                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                evento_id INT,
                tipo_sinal VARCHAR(100),
                valor_detectado FLOAT,
                FOREIGN KEY (evento_id) REFERENCES ciclone_evento(id)
            )`
        ];

        for (const sql of tabelas) {
            await connection.query(sql);
        }
        console.log('✅ Todas as tabelas foram criadas (Passo 2 Concluído).');

        
        console.log('⏳ Inserindo ciclones de teste...');
        const sqlInsert = `INSERT INTO ciclone_evento (data_inicio, classificacao, impacto_observado) VALUES ?`;
        const valores = [
            ['2004-03-24 00:00:00', 'Furacão Catarina', 'Danos massivos em SC/RS'],
            ['2022-05-17 00:00:00', 'Tempestade Yakecan', 'Ventos acima de 100km/h'],
            ['2020-06-30 00:00:00', 'Ciclone Bomba', 'Destruição ampla na rede elétrica']
        ];
        
        await connection.query(sqlInsert, [valores]);
        console.log('✅ 3 Ciclones históricos inseridos com sucesso!');

    } catch (error) {
        console.error('ERRO:', error.message);
    } finally {
        if (connection) await connection.end();
        console.log('Processo finalizado.');
    }
}

setupProjeto();