import winston from 'winston';
import path from 'path';

const LOG_DIR = path.resolve(__dirname, '../../logs');

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase().padEnd(5)} — ${message}`;
    }),
  ),
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] ${level} — ${message}`;
        }),
      ),
    }),
    new winston.transports.File({
      filename: path.join(LOG_DIR, 'test-run.log'),
      level: 'debug',
      maxsize: 5 * 1024 * 1024, // 5 MB
      maxFiles: 3,
    }),
  ],
});

/** Application logger wrapping Winston with a `step()` convenience method. */
const Logger = {
  info: (message: string) => logger.info(message),
  debug: (message: string) => logger.debug(message),
  warn: (message: string) => logger.warn(message),
  error: (message: string) => logger.error(message),

  /** Logs a numbered test step — useful for tracing test flow. */
  step: (stepNumber: number, description: string) => {
    logger.info(`Step ${stepNumber}: ${description}`);
  },
};

export default Logger;
