import { join } from 'path';
import { GraphQLError } from 'graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';

export async function getGraphqlConfig(): Promise<ApolloDriverConfig> {
  return {
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    sortSchema: true,
    playground: true,
    introspection: true,
    buildSchemaOptions: {
      numberScalarMode: 'integer',
    },
    context: ({ req, res }) => ({ req, res }),
    formatError: (error: GraphQLError) => {
      const originalError = error?.extensions?.originalError as any;
      return {
        message: originalError?.message || error.message,
      };
    },
  };
}
