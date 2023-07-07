import { Logger } from '@nestjs/common';
import { ReflectMetadataProvider, Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { configuration } from './configuration';
import { User, Referendum } from './entities';
import { migrationsList } from './utils';

const logger = new Logger('MikroORM');

const config: Options = {
  entities: [User, Referendum],
  clientUrl: configuration().databaseUrl,
  metadataProvider: ReflectMetadataProvider,
  driver: PostgreSqlDriver,
  type: 'postgresql',
  migrations: { migrationsList },
  validate: false,
  validateRequired: false,
  seeder: {
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
    path: './dist/seeders',
    pathTs: './src/seeders',
    defaultSeeder: 'DatabaseSeeder',
    fileName: (className: string) => className,
  },
  logger: logger.log.bind(logger),
};

export default config;
