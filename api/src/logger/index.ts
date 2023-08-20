import winston from "winston"

const logger = winston.createLogger({
    format: winston.format.combine(winston.format.json(), winston.format.timestamp()),
    defaultMeta: { service: 'api' },
    transports: [
        new winston.transports.File({ filename: 'log/info.log', level: "info" }),
        new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
    ],
});

export { logger }

