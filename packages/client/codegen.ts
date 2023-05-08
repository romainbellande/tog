import { join, resolve } from 'path';

import type { CodegenConfig } from '@graphql-codegen/cli';

const basedir = 'packages/client/src';

const config: CodegenConfig = {
  overwrite: true,
  ignoreNoDocuments: true, // for better experience with the watcher
  documents: [`${basedir}/**/*.tsx`],
  generates: {
    [`${basedir}/gql/`]: {
      // documents: [join(__dirname, './src/gql/**/*.graphql')],
      schema: "http://api.tog.localhost/graphql",
      preset: "client",
      // config: {
      //   documentMode: 'string'
      // }
      // plugins: ['typescript-react-query'],
      // config: {
      //   fetcher: 'graphql-request',
      //   dedupeOperationSuffix: true
      // }
    }
  }
};

export default config;
