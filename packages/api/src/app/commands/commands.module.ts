import { Module } from '@nestjs/common';
import { DatabaseCommand } from './database.command';
import { ConsoleModule } from 'nestjs-console';

@Module({
  imports: [ConsoleModule],
  controllers: [],
  providers: [DatabaseCommand],
  exports: [DatabaseCommand],
})
export class CommandsModule {}
