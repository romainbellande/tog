import { MigrationObject } from '@mikro-orm/core';
import { basename } from 'path';

const migrations = {};

function importAll(r) {
  r.keys().forEach(
    (key) => (migrations[basename(key)] = Object.values(r(key))[0])
  );
}

importAll(require.context('../migrations', false, /\.ts$/));

export const migrationsList: MigrationObject[] = Object.keys(migrations).map(
  (migrationName) => ({
    name: migrationName,
    class: migrations[migrationName],
  })
);
