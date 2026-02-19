// src/config/logger.js
const winston = require('winston');
const path = require('path');

// níveis de severidade
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// cores para cada nível (console)
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);


const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

// onde os arquivos de log serão salvos
const transports = [
  // mostra tudo quando não em produção
  new winston.transports.Console(),
  
  // salva apenas nível 'error'
  new winston.transports.File({
    filename: path.join(__dirname, '../logs/error.log'),
    level: 'error',
    format: winston.format.json(), // li por aí q JSON é melhor para parsear depois
  }),
  
  // salva tudo
  new winston.transports.File({
    filename: path.join(__dirname, '../logs/combined.log'),
    format: winston.format.json(),
  }),
];

const logger = winston.createLogger({
  level: 'debug',
  levels,
  transports,
});

module.exports = logger;