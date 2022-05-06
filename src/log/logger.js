import logger from 'pino';
export class Logger {
  constructor(filename) {
    this.log = logger({
      prettyPrint: {
        colorize: true,
        levelFirst: true,
        translateTime: 'SYS:dd-mm-yyyy HH-MM-ss',
        ignore: 'pid,hostname'
      }
    });
    this.filename = filename;
  }

  info(msg) {
    this.log.info(this.filename + ': ' + msg);
  }

  error(msg) {
    this.log.error(this.filename + ' ' + msg);
  }
}
