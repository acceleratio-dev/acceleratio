import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { env } from 'next-runtime-env';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: env('NEXT_PUBLIC_API_URL'),
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: env('NEXT_PUBLIC_WS_URL') as string,
  }),
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
