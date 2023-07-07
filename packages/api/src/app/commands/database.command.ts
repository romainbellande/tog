import { DatabaseSeeder } from '@api/seeders/database.seeder';
import { MikroORM } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Console, Command, createSpinner } from 'nestjs-console';

interface MigrationCreateOptions {
  initial: boolean;
}

@Console({ command: 'db' })
@Injectable()
export class DatabaseCommand {
  constructor(private readonly orm: MikroORM) {}

  @Command({
    command: 'migration:create',
    description: 'create database migration',
    options: [
      {
        flags: '-i, --initial',
        required: false,
        defaultValue: false,
        description: 'initial migration',
      },
    ],
  })
  async migrationCreate({ initial }: MigrationCreateOptions) {
    const spin = createSpinner();
    spin.start('create migration file...');
    try {
      const migrator = this.orm.getMigrator();

      if (initial) {
        await migrator.createInitialMigration();
      } else {
        await migrator.createMigration();
      }
    } catch (error) {
      spin.fail(`an error occured during migration file creation: ${error}`);
    }
    spin.succeed();
  }

  @Command({
    command: 'migration:up',
    description: 'migrate up to the latest version',
  })
  async migrationUp() {
    const spin = createSpinner();
    spin.start('executing migration...');
    try {
      const migrator = this.orm.getMigrator();

      await migrator.up();
    } catch (error) {
      spin.fail(`an error occured during migration execution: ${error}`);
    }
    spin.succeed();
  }

  @Command({
    command: 'seeder:run',
    description: 'run seeder',
  })
  async seederRun() {
    const seeder = this.orm.getSeeder();
    await this.dbDrop();
    const spin = createSpinner();
    spin.start('executing db seeder run...');

    try {
      await seeder.seed(DatabaseSeeder);
    } catch (error) {
      spin.fail(`an error occured during db seeder run: ${error}`);
    }

    spin.succeed('db seeder run successfully');
  }

  @Command({
    command: 'drop',
    description: 'drop database',
  })
  async dbDrop() {
    const spin = createSpinner();
    spin.start('executing db drop...');
    try {
      await this.orm.getSchemaGenerator().refreshDatabase();
    } catch (error) {
      spin.fail(`an error occured during db drop: ${error}`);
    }

    spin.succeed('db dropped successfully');
  }
}
