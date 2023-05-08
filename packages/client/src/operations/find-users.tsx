import { graphql } from '../gql/gql';

export const findUsers = graphql(`
  query FindUsers {
    users {
      id
      externalId
      name
    }
  }
`);
