import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
} from '@nestjs/common';
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { pinoLoggerFactory } from '@api/utils/pino-logger-factory';
import { MikroORM, ReflectMetadataProvider } from '@mikro-orm/core';
import { LoggerModule } from 'nestjs-pino';
import { join } from 'path';

import { UsersModule } from './users/users.module';
import { CommandsModule } from './commands/commands.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  validationSchema,
  configuration,
  Configuration,
} from '../configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
      isGlobal: true,
      load: [configuration],
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: pinoLoggerFactory,
      inject: [ConfigService],
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<Configuration>) => ({
        autoLoadEntities: true,
        clientUrl: configService.get('databaseUrl'),
        metadataProvider: ReflectMetadataProvider,
        driver: PostgreSqlDriver,
        discovery: { disableDynamicFileAccess: true },
        registerRequestContext: false,
        type: 'postgresql',
        migrations: {
          path: 'dist/packages/api/migrations',
          pathTs: join(__dirname, '../migrations'),
        },
        validate: false,
        validateRequired: false,
      }),
      inject: [ConfigService],
    }),
    CommandsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: true,
      sortSchema: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      introspection: true,
    }),
    UsersModule,
    // ReferendumModule,
    // ReferendumVoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule, OnModuleInit {
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit(): Promise<void> {
    await this.orm.getMigrator().up();
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MikroOrmMiddleware).forRoutes('/graphql/*');
  }
}
