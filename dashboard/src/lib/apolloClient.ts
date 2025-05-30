import { ApolloClient, split } from '@apollo/client';
import { InMemoryCache } from '@apollo/client';
import { createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      // authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/graphql',
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080/graphql',
  }),
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(splitLink),
  // defaultOptions: {
  //   watchQuery: {
  //     fetchPolicy: 'no-cache',
  //     errorPolicy: 'all',
  //   },
  //   query: {
  //     fetchPolicy: 'no-cache',
  //     errorPolicy: 'all',
  //   },
  // },
});
