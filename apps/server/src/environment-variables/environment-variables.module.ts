import { Module } from '@nestjs/common';
import { EnvironmentVariablesService } from './environment-variables.service';
import { EnvironmentVariablesResolver } from './environment-variables.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentVariable } from './entities/environment-variables';

@Module({
  imports: [TypeOrmModule.forFeature([EnvironmentVariable])],
  providers: [EnvironmentVariablesResolver, EnvironmentVariablesService],
  exports: [EnvironmentVariablesService],
})
export class EnvironmentVariablesModule {}
