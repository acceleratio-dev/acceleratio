import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { getGraphqlConfig } from './config/graphql.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { DockerModule } from './docker/docker.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost:27017/acceleratio'),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: getGraphqlConfig,
    }),
    AuthModule,
    UserModule,
    DockerModule,
    ProjectModule,
  ],
})
export class AppModule {}
