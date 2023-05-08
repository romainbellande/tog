import { GraphQLClient } from 'graphql-request'
import { configuration } from './configuration';

export const graphqlClient = new GraphQLClient(configuration.graphqlEndpoint);
