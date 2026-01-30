const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Importar as rotas
const estacaoRoutes = require('./routes/estacaoRoutes');
const cicloneRoutes = require('./routes/cicloneRoutes');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// Usar as rotas
app.use('/api', estacaoRoutes);
app.use('/api', cicloneRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = app;