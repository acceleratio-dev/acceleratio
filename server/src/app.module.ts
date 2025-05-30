import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getGraphqlConfig } from './config/graphql.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { DockerModule } from './docker/docker.module';
import { ProjectModule } from './project/project.module';
import { ServiceModule } from './service/service.module';
import { DeploymentModule } from './deployment/deployment.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: getGraphqlConfig,
    }),
    AuthModule,
    UserModule,
    DockerModule,
    ProjectModule,
    ServiceModule,
    DeploymentModule,
  ],
})
export class AppModule {}
