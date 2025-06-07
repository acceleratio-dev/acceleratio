import { Module } from '@nestjs/common';
import { PodModule } from './pod/pod.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { KubernetesModule } from './kubernetes/kubernetes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { NodeModule } from './node/node.module';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { GraphQLError } from 'graphql';
import { ServiceModule } from './service/service.module';
import { DeploymentModule } from './deployment/deployment.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('config.database.url'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: (error: GraphQLError) => {
        const originalError = error?.extensions?.originalError as any;
        return {
          message: originalError?.message || error.message,
        };
      },
    }),
    PodModule,
    KubernetesModule,
    NodeModule,
    UserModule,
    ProjectModule,
    ServiceModule,
    DeploymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
