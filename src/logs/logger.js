// src/logs/logger.js
const winston = require('winston');
const path = require('path');

// Define o formato do log
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = winston.createLogger({
  level: 'info', // Grava tudo que for 'info' ou mais grave (warn, error)
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    // 1. Mostra no Terminal
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        logFormat
      )
    }),
    // 2. Grava num arquivo 'erro.log' (para erros graves)
    new winston.transports.File({ 
      filename: path.join(__dirname, 'erros.log'), 
      level: 'error' 
    }),
    // 3. Grava TUDO em 'combinado.log' (histórico geral)
    new winston.transports.File({ 
      filename: path.join(__dirname, 'sistema.log') 
    })
  ],
});

module.exports = logger;