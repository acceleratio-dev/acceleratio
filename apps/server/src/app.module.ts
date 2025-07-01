import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { KubernetesModule } from './kubernetes/kubernetes.module';
import { ServicesModule } from './services/services.module';
import { ProjectsModule } from './projects/projects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { GraphQLError } from 'graphql';
import { DomainsModule } from './domains/domains.module';
import { EnvironmentVariablesModule } from './environment-variables/environment-variables.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: (error: GraphQLError) => {
        const originalError = error?.extensions?.originalError as any;
        return {
          message: originalError?.message || error.message,
        };
      },
      subscriptions: {
        'graphql-ws': true,
      },
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('config.database.host'),
        username: configService.get('config.database.user'),
        password: configService.get('config.database.password'),
        database: configService.get('config.database.db'),
        ssl: configService.get('config.database.ssl'),
        autoLoadEntities: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    KubernetesModule,
    ServicesModule,
    ProjectsModule,
    DomainsModule,
    EnvironmentVariablesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
