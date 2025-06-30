import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Domain, DomainStatus } from './entities/domain.entity';
import { CreateDomainInput } from './dto/create-domain.input';
import { AssignDomainInput } from './dto/assign-domain.input';
import { ServicesService } from 'src/services/services.service';
import { KubernetesNetworksService } from 'src/kubernetes/kubernetes-networks.service';
import { resolve4 } from 'dns';

@Injectable()
export class DomainsService {
  constructor(
    @InjectRepository(Domain)
    private readonly domainRepository: Repository<Domain>,
    private readonly kubernetesNetworksService: KubernetesNetworksService,
    private readonly servicesService: ServicesService,
  ) {}

  async getDomains() {
    return this.domainRepository.find();
  }

  async updateDomainStatuses() {
    const domains = await this.domainRepository.find();
    const loadBalancerIP = await this.kubernetesNetworksService.getLoadBalancerIP();

    for (const domain of domains) {
      await resolve4(domain.url, async (err, addresses) => {
        if (err) {
          throw new Error('Failed to resolve domain');
        }
        if (addresses.includes(loadBalancerIP) && domain.status !== DomainStatus.ACTIVE) {
          domain.status = DomainStatus.ACTIVE;
        } else if (domain.status !== DomainStatus.PENDING) {
          domain.status = DomainStatus.PENDING;
        }
        await this.domainRepository.save(domain);
      });
    }

    return true;
  }

  async createDomain(createDomainInput: CreateDomainInput) {
    const isExists = await this.domainRepository.findOne({
      where: {
        url: createDomainInput.url,
      },
    });
    if (isExists) {
      throw new Error('Domain already exists');
    }
    return this.domainRepository.save(createDomainInput);
  }

  async assignDomainToService(assignDomainInput: AssignDomainInput) {
    const domain = await this.domainRepository.findOne({
      where: {
        id: assignDomainInput.domainId,
      },
    });
    if (!domain) {
      throw new Error('Domain not found');
    }

    const service = await this.servicesService.getServiceById(assignDomainInput.serviceId);

    await this.kubernetesNetworksService.assignPathToService({
      domain: domain.url,
      prefix: assignDomainInput.path,
      serviceId: service.id,
      serviceNamespace: service.project.kubernetesNamespace,
      port: assignDomainInput.port,
      stripPrefix: assignDomainInput.stripPath,
    });

    return true;
  }

  async listServiceDomains(serviceId: string) {
    return this.kubernetesNetworksService.getServiceDomains(serviceId);
  }

  async removeDomainFromService(serviceId: string, url: string, path: string) {
    const domain = await this.domainRepository.findOne({
      where: {
        url: url,
      },
    });
    if (!domain) {
      throw new Error('Domain not found');
    }

    await this.kubernetesNetworksService.removeServiceDomain(serviceId, url, path);
    return true;
  }
}
