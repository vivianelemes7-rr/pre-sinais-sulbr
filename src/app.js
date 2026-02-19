const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// importação logger
const requestLogger = require('./middlewares/requestLogger');

// importação rotas
const preSinaisRoutes = require('./routes/preSinaisRoutes');
const estacaoRoutes = require('./routes/estacaoRoutes');
const cicloneRoutes = require('./routes/cicloneRoutes');
const indicesRoutes = require('./routes/indicesClimaticosRoutes');
const eventosSeverosRoutes = require('./routes/eventosSeverosRoutes');

const app = express();

// midlewares globais
app.use(cors());
app.use(helmet());
app.use(express.json());

// ativação do logger
// É importante que ele fique AQUI, depois do json() e antes das rotas.
app.use(requestLogger);

// definição rotas
app.use('/api', estacaoRoutes);
app.use('/api', cicloneRoutes);
app.use('/eventos-severos', eventosSeverosRoutes);
app.use('/pre-sinais', preSinaisRoutes);

// configuração da rota de índices
// URL: http://localhost:3000/indices-climaticos
app.use('/indices-climaticos', indicesRoutes);

// health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = app;