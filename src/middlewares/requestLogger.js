// src/middlewares/requestLogger.js
const logger = require('../config/logger');

const requestLogger = (req, res, next) => {
  // loga o método e a URL que está sendo acessada
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
};

module.exports = requestLogger;