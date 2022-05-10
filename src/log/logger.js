import logger from 'pino';
export class Logger {
  constructor(className) {
    this.log = logger({
      prettyPrint: {
        colorize: true,
        levelFirst: true,
        translateTime: 'SYS:dd-mm-yyyy HH-MM-ss',
        ignore: 'pid,hostname'
      }
    });
    this.className = className;
  }

  info(msg) {
    this.log.info(this.className + ': ' + msg);
  }

  error(msg) {
    this.log.error(this.className + ' ' + msg);
  }
}
