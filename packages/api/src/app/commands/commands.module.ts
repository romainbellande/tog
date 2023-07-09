import { Module } from '@nestjs/common';
import { DatabaseCommand } from './database.command';
import { ConsoleModule } from 'nestjs-console';
import { JsonSchemaCommand } from './json-schema.command';

@Module({
  imports: [ConsoleModule],
  controllers: [],
  providers: [DatabaseCommand, JsonSchemaCommand],
  exports: [DatabaseCommand, JsonSchemaCommand],
})
export class CommandsModule {}
