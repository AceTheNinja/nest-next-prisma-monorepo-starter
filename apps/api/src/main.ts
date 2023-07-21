import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import httpContext = require('express-http-context');
import helmet = require('helmet');
import { ConfigService } from '@nestjs/config';
import { setContext } from './common/middleware/setContext';
import { LoggerService } from './common/logger/logger.service';

function formatErroText(appName: string, err: any): string {
  let errorText = `[${appName}] Uncaught Exception: `;
  if (err && err?.response && err?.response?.data) {
    // http exceptions
    errorText += JSON.stringify(err.response.data);
  } else {
    // standard exceptions
    errorText += err?.message + err?.stack;
  }
  return errorText;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });
  const config = app.get(ConfigService);
  const appName = config.get('appName');

  app.use(
    helmet({ contentSecurityPolicy: process.env.NODE_ENV !== 'development' }),
  );
  app.use(httpContext.middleware);
  app.use(setContext(appName));

  const logger = app.get(LoggerService);
  process.on('unhandledRejection', (err: any) => {
    const errorText: string = formatErroText(appName, err);
    logger.error(errorText);
  });
  process.on('uncaughtException', (err: any) => {
    const errorText: string = formatErroText(appName, err);
    logger.error(errorText);
  });

  await app.listen(3008);
  logger.info(`App listening on port 3008`);
}

bootstrap();
