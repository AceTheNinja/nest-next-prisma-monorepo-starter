import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { WinstonLogger } from './winston-logger.service';
/**
 *
 * Global Scoped Logger Module which exports the Graylogger
 * @export
 * @class LoggerModule
 */
@Global()
@Module({
  imports: [HttpModule],
  providers: [LoggerService, WinstonLogger],
  exports: [LoggerService],
})
export class LoggerModule {}
