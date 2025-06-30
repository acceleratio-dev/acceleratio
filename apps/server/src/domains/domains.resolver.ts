import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DomainsService } from './domains.service';
import { Domain } from './entities/domain.entity';
import { CreateDomainInput } from './dto/create-domain.input';
import { AssignDomainInput } from './dto/assign-domain.input';
import { ServiceDomainsObject } from './dto/service-domains.object';

@Resolver()
export class DomainsResolver {
  constructor(private readonly domainsService: DomainsService) {}

  @Query(() => [Domain])
  async getDomains() {
    return this.domainsService.getDomains();
  }

  @Mutation(() => Boolean)
  async updateDomainStatuses() {
    return this.domainsService.updateDomainStatuses();
  }

  @Query(() => [ServiceDomainsObject])
  async getServiceDomains(@Args('serviceId') serviceId: string) {
    return this.domainsService.listServiceDomains(serviceId);
  }

  @Mutation(() => Domain)
  async createDomain(@Args('createDomainInput') createDomainInput: CreateDomainInput) {
    return this.domainsService.createDomain(createDomainInput);
  }

  @Mutation(() => Boolean)
  async removeDomainFromService(
    @Args('serviceId') serviceId: string,
    @Args('url') url: string,
    @Args('path') path: string,
  ) {
    return this.domainsService.removeDomainFromService(serviceId, url, path);
  }

  @Mutation(() => Boolean)
  async assignDomainToService(@Args('assignDomainInput') assignDomainInput: AssignDomainInput) {
    return this.domainsService.assignDomainToService(assignDomainInput);
  }
}
