import { MigrationObject } from '@mikro-orm/core';
import { basename, join } from 'path';
import { readdirSync } from 'fs';

const getTsFilesFromDir = (path: string): string[] => {
  const basePath = join(__dirname, path);
  const files = readdirSync(basePath);
  const fileredFiles = files
    .filter((file) => file.endsWith('.ts'))
    .map((filePath) => join(basePath, filePath));

  return fileredFiles;
};

const getMigrationsList = (path: string): MigrationObject[] => {
  return getTsFilesFromDir(path).map((filePath) => ({
    name: basename(filePath),
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    class: require(filePath)[0],
  }));
};

export const migrationsList: MigrationObject[] =
  getMigrationsList('../migrations');
