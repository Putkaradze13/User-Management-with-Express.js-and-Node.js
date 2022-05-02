import { pino } from 'pino';

export const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      levelFirst: true,
      colorize: true,
      translateTime: 'SYS:dd-mm-yyyy HH-MM-ss',
      ignore: 'pid,hostname'
    }
  }
});
