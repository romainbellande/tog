import { Injectable } from '@nestjs/common';
import { Console, Command, createSpinner } from 'nestjs-console';
import { createGenerator, Config } from 'ts-json-schema-generator';
import { join } from 'path';
import { writeFile } from 'fs/promises';

@Console({ command: 'jsch' })
@Injectable()
export class JsonSchemaCommand {
  @Command({
    command: 'gen',
    description: 'generate json schemas for entities',
  })
  async generate() {
    const spinner = createSpinner();
    spinner.start('Generating schemas...');

    const entities: string[] = ['user', 'referendum-vote', 'referendum'];

    const promises = entities.map((entityName) =>
      this.generateJsonSchemaFromEntity(entityName)
    );

    await Promise.all(promises);

    spinner.stop();
  }

  private generateJsonSchemaFromEntity(entityName: string): Promise<void> {
    const basePath = join(__dirname, '../../');
    const src = `${basePath}/entities`;
    const dest = `${src}/json-schema`;

    const config: Config = {
      path: `${src}/${entityName}.entity.ts`,
      tsconfig: join(__dirname, '../../../tsconfig.json'),
      type: '*',
    };

    const schema = createGenerator(config).createSchema(config.type);

    const schemaString = JSON.stringify(schema, null, 2);

    return writeFile(`${dest}/${entityName}.json`, schemaString, { flag: 'w' });
  }
}
