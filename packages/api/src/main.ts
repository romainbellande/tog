/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MikroORM, RequestContext } from '@mikro-orm/core';

import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { Configuration } from './configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const orm = app.get(MikroORM);

  app.use((req, res, next) => {
    RequestContext.create(orm.em.fork({ useContext: true }), next);
  });


  const configService = app.get<ConfigService<Configuration>>(ConfigService);

  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);

  const port = configService.get('port');

  await app.listen(port, '0.0.0.0');

  Logger.log(
    `🚀 Api is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
