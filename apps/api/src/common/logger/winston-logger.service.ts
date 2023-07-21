import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import winston = require('winston');

@Injectable()
export class WinstonLogger {
  constructor(private configService: ConfigService) {
    const appName = this.configService.get('appName');
    const transports: winston.transport[] = [
      new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.simple(),
        ),
      }),
    ];

    winston.loggers.add('access-log', {
      defaultMeta: { service: appName },
      transports,
    });
  }

  public get logger() {
    return winston.loggers.get('access-log');
  }

  check() {
    return 'ok';
  }
}
