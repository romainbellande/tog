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

import { graphqlClient } from '../graphql-client';

export const findUsersQuery = () => graphqlClient.request(findUsers);
