const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const preSinaisRoutes = require('./routes/preSinaisRoutes');

// Importar as rotas
const estacaoRoutes = require('./routes/estacaoRoutes');
const cicloneRoutes = require('./routes/cicloneRoutes');
const indicesRoutes = require('./routes/indicesClimaticosRoutes');
const eventosSeverosRoutes = require('./routes/eventosSeverosRoutes'); 

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// Usar as rotas
app.use('/api', estacaoRoutes);
app.use('/api', cicloneRoutes);
app.use('/eventos-severos', eventosSeverosRoutes);
app.use('/pre-sinais', preSinaisRoutes);

// Configuração da rota de índices
// Para criar a url http://localhost:3000/indices-climaticos
app.use('/indices-climaticos', indicesRoutes); 

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = app;