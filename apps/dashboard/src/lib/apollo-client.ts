import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { env } from 'next-runtime-env';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: `${process.env.NODE_ENV === 'production' ? 'https' : 'http'}://${env('NEXT_PUBLIC_API_URL')}/graphql`,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${process.env.NODE_ENV === 'production' ? 'wss' : 'ws'}://${env('NEXT_PUBLIC_API_URL')}/graphql`,
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
