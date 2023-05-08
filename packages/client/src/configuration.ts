interface Configuration {
  graphqlEndpoint: string;
}

export const configuration: Configuration = {
  graphqlEndpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || '',
}
