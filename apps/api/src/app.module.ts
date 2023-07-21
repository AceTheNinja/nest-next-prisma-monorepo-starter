import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { ScheduleModule } from '@nestjs/schedule';

import { configuration } from './config';

import { HelloModule } from './modules/hello/hello.module';
import { LoggerModule } from './common/logger/logger.module';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
      port: 8001,
    }),
    ConfigModule.forRoot({
      envFilePath: `./${process.env.ENV_FILE}`,
      load: [configuration],
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    LoggerModule,
    HelloModule,
  ],
  providers: [],
})
export class AppModule {}
