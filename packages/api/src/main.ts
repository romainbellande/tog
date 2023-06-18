/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { Configuration, configuration } from './configuration';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import {
  MikroORM,
  IDatabaseDriver,
  Connection,
  RequestContext,
} from '@mikro-orm/core';
import { ValidationPipe } from '@nestjs/common';
import { Tracing } from './utils/tracing';

interface HandleMigrationProps {
  logger: Logger;
  orm: MikroORM<IDatabaseDriver<Connection>>;
}

const handleMigration = async ({ logger, orm }: HandleMigrationProps) => {
  const migrator = orm.getMigrator();

  const migrations = await migrator.getPendingMigrations();

  if (migrations && migrations.length > 0) {
    await migrator.up();
    logger.log(`${migrations.length} migration(s) applied`);
  } else {
    logger.log('No pending migrations found');
  }
};

async function bootstrap() {
  const tracing = new Tracing(configuration().tracing);
  tracing.start();
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );

  const logger = app.get(Logger);
  app.useLogger(logger);
  const orm = app.get(MikroORM);

  await handleMigration({ logger, orm });

  app.use((req, res, next) => {
    RequestContext.create(orm.em.fork({ useContext: true }), next);
  });

  const configService = app.get<ConfigService<Configuration>>(ConfigService);

  const port = configService.get('port');
  const host = configService.get('host');
  await app.listen(port, host);

  logger.log(`🚀 Api is running on: http://${host}:${port}/graphql`);
}

bootstrap();
