import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AssignDomainInput = {
  domainId: Scalars['String']['input'];
  path: Scalars['String']['input'];
  port: Scalars['Float']['input'];
  serviceId: Scalars['String']['input'];
  stripPath: Scalars['Boolean']['input'];
};

export type CreateDomainInput = {
  url: Scalars['String']['input'];
};

export type CreateEnvironmentVariableInput = {
  name: Scalars['String']['input'];
  projectId?: InputMaybe<Scalars['String']['input']>;
  scope: EnvironmentVariableScope;
  serviceId?: InputMaybe<Scalars['String']['input']>;
  value: Scalars['String']['input'];
};

export type CreateProjectInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateServiceInput = {
  name: Scalars['String']['input'];
  projectId: Scalars['String']['input'];
};

export type Domain = {
  __typename?: 'Domain';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  status: DomainStatus;
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export enum DomainStatus {
  Active = 'ACTIVE',
  Pending = 'PENDING'
}

export type EnvironmentVariable = {
  __typename?: 'EnvironmentVariable';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  projectId?: Maybe<Scalars['String']['output']>;
  scope: EnvironmentVariableScope;
  serviceId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  value: Scalars['String']['output'];
};

export enum EnvironmentVariableScope {
  Project = 'PROJECT',
  Service = 'SERVICE'
}

export type Mutation = {
  __typename?: 'Mutation';
  assignDomainToService: Scalars['Boolean']['output'];
  createDomain: Domain;
  createEnvironmentVariable: EnvironmentVariable;
  createProject: Project;
  createService: Service;
  deleteEnvironmentVariable: Scalars['Boolean']['output'];
  deployService: Scalars['Boolean']['output'];
  removeDomainFromService: Scalars['Boolean']['output'];
  removeNode: Scalars['Boolean']['output'];
  restartPod: Scalars['Boolean']['output'];
  stopService: Scalars['Boolean']['output'];
  updateDomainStatuses: Scalars['Boolean']['output'];
  updateService: Service;
  updateServiceDeployment: ServiceDeployment;
};


export type MutationAssignDomainToServiceArgs = {
  assignDomainInput: AssignDomainInput;
};


export type MutationCreateDomainArgs = {
  createDomainInput: CreateDomainInput;
};


export type MutationCreateEnvironmentVariableArgs = {
  createEnvironmentVariableInput: CreateEnvironmentVariableInput;
};


export type MutationCreateProjectArgs = {
  createProjectInput: CreateProjectInput;
};


export type MutationCreateServiceArgs = {
  createServiceInput: CreateServiceInput;
};


export type MutationDeleteEnvironmentVariableArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeployServiceArgs = {
  serviceId: Scalars['String']['input'];
};


export type MutationRemoveDomainFromServiceArgs = {
  path: Scalars['String']['input'];
  serviceId: Scalars['String']['input'];
  url: Scalars['String']['input'];
};


export type MutationRemoveNodeArgs = {
  nodeId: Scalars['String']['input'];
};


export type MutationRestartPodArgs = {
  podName: Scalars['String']['input'];
  serviceId: Scalars['String']['input'];
};


export type MutationStopServiceArgs = {
  serviceId: Scalars['String']['input'];
};


export type MutationUpdateServiceArgs = {
  updateServiceInput: UpdateServiceInput;
};


export type MutationUpdateServiceDeploymentArgs = {
  updateServiceDeploymentInput: UpdateServiceDeploymentInput;
};

export type NodeEntity = {
  __typename?: 'NodeEntity';
  cpu: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  ip: Scalars['String']['output'];
  isMaster: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  ram: Scalars['String']['output'];
  status: Scalars['String']['output'];
  storage: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Pod = {
  __typename?: 'Pod';
  image: Scalars['String']['output'];
  name: Scalars['String']['output'];
  node: Scalars['String']['output'];
  startTime: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export enum PodEventType {
  Created = 'CREATED',
  Deleted = 'DELETED',
  Updated = 'UPDATED'
}

export type PodMessage = {
  __typename?: 'PodMessage';
  pod: Pod;
  type: PodEventType;
};

export type Project = {
  __typename?: 'Project';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  kubernetesNamespace?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAddNodeCommand: Scalars['String']['output'];
  getDomains: Array<Domain>;
  getLoadBalancerIP: Scalars['String']['output'];
  getNodes: Array<NodeEntity>;
  getPodLogs: Array<Scalars['String']['output']>;
  getProjectById: Project;
  getProjectEnvironmentVariables: Array<EnvironmentVariable>;
  getProjects: Array<Project>;
  getServiceById: Service;
  getServiceDeployments: Array<ServiceDeployment>;
  getServiceDomains: Array<ServiceDomainsObject>;
  getServiceEnvironmentVariables: Array<EnvironmentVariable>;
  getServicePods: Array<Pod>;
  getServicesByProjectId: Array<Service>;
};


export type QueryGetPodLogsArgs = {
  podName: Scalars['String']['input'];
  serviceId: Scalars['String']['input'];
};


export type QueryGetProjectByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetProjectEnvironmentVariablesArgs = {
  projectId: Scalars['String']['input'];
};


export type QueryGetServiceByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetServiceDeploymentsArgs = {
  serviceId: Scalars['String']['input'];
};


export type QueryGetServiceDomainsArgs = {
  serviceId: Scalars['String']['input'];
};


export type QueryGetServiceEnvironmentVariablesArgs = {
  serviceId: Scalars['String']['input'];
};


export type QueryGetServicePodsArgs = {
  serviceId: Scalars['String']['input'];
};


export type QueryGetServicesByProjectIdArgs = {
  projectId: Scalars['String']['input'];
};

export type Service = {
  __typename?: 'Service';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  projectId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ServiceDeployment = {
  __typename?: 'ServiceDeployment';
  cpuLimit?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  image: Scalars['String']['output'];
  internalName?: Maybe<Scalars['String']['output']>;
  memoryLimit?: Maybe<Scalars['Float']['output']>;
  provider: ServiceDeploymentProvider;
  replicas?: Maybe<Scalars['Float']['output']>;
  serviceId: Scalars['String']['output'];
  status: ServiceDeploymentStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type ServiceDeploymentEventMessage = {
  __typename?: 'ServiceDeploymentEventMessage';
  deployment: ServiceDeployment;
  event_type: ServiceDeploymentEventType;
};

export enum ServiceDeploymentEventType {
  DeploymentCreated = 'DEPLOYMENT_CREATED',
  DeploymentDeployed = 'DEPLOYMENT_DEPLOYED',
  DeploymentUpdated = 'DEPLOYMENT_UPDATED'
}

export enum ServiceDeploymentProvider {
  Docker = 'DOCKER',
  Github = 'GITHUB'
}

export enum ServiceDeploymentStatus {
  Active = 'ACTIVE',
  Draft = 'DRAFT',
  Finished = 'FINISHED'
}

export type ServiceDomainsObject = {
  __typename?: 'ServiceDomainsObject';
  domain: Scalars['String']['output'];
  path: Scalars['String']['output'];
  port: Scalars['Float']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  serviceDeployments: ServiceDeploymentEventMessage;
  servicePods: PodMessage;
};


export type SubscriptionServiceDeploymentsArgs = {
  serviceId: Scalars['String']['input'];
};


export type SubscriptionServicePodsArgs = {
  serviceId: Scalars['String']['input'];
};

export type UpdateServiceDeploymentInput = {
  cpuLimit?: InputMaybe<Scalars['Float']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  memoryLimit?: InputMaybe<Scalars['Float']['input']>;
  provider?: InputMaybe<ServiceDeploymentProvider>;
  replicas?: InputMaybe<Scalars['Float']['input']>;
  serviceId: Scalars['String']['input'];
};

export type UpdateServiceInput = {
  name: Scalars['String']['input'];
  serviceId: Scalars['String']['input'];
};

export type AssignDomainToServiceMutationVariables = Exact<{
  assignDomainInput: AssignDomainInput;
}>;


export type AssignDomainToServiceMutation = { __typename?: 'Mutation', assignDomainToService: boolean };

export type CreateDomainMutationVariables = Exact<{
  createDomainInput: CreateDomainInput;
}>;


export type CreateDomainMutation = { __typename?: 'Mutation', createDomain: { __typename?: 'Domain', id: string, url: string, createdAt: any } };

export type GetDomainsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDomainsQuery = { __typename?: 'Query', domains: Array<{ __typename?: 'Domain', id: string, url: string, createdAt: any, status: DomainStatus }> };

export type GetServiceDomainsQueryVariables = Exact<{
  serviceId: Scalars['String']['input'];
}>;


export type GetServiceDomainsQuery = { __typename?: 'Query', domains: Array<{ __typename?: 'ServiceDomainsObject', path: string, domain: string, port: number }> };

export type RemoveDomainFromServiceMutationVariables = Exact<{
  serviceId: Scalars['String']['input'];
  url: Scalars['String']['input'];
  path: Scalars['String']['input'];
}>;


export type RemoveDomainFromServiceMutation = { __typename?: 'Mutation', removeDomainFromService: boolean };

export type UpdateDomainStatusesMutationVariables = Exact<{ [key: string]: never; }>;


export type UpdateDomainStatusesMutation = { __typename?: 'Mutation', updateDomainStatuses: boolean };

export type CreateEnvironmentVariableMutationVariables = Exact<{
  createEnvironmentVariableInput: CreateEnvironmentVariableInput;
}>;


export type CreateEnvironmentVariableMutation = { __typename?: 'Mutation', createEnvironmentVariable: { __typename?: 'EnvironmentVariable', id: string, name: string, value: string, scope: EnvironmentVariableScope, updatedAt: any, createdAt: any } };

export type DeleteEnvironmentVariableMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteEnvironmentVariableMutation = { __typename?: 'Mutation', deleteEnvironmentVariable: boolean };

export type GetServiceEnvironmentVariablesQueryVariables = Exact<{
  serviceId: Scalars['String']['input'];
}>;


export type GetServiceEnvironmentVariablesQuery = { __typename?: 'Query', variables: Array<{ __typename?: 'EnvironmentVariable', id: string, name: string, value: string, scope: EnvironmentVariableScope, updatedAt: any, createdAt: any }> };

export type GetLoadBalancerIpQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLoadBalancerIpQuery = { __typename?: 'Query', ip: string };

export type GetServicePodsQueryVariables = Exact<{
  serviceId: Scalars['String']['input'];
}>;


export type GetServicePodsQuery = { __typename?: 'Query', pods: Array<{ __typename?: 'Pod', name: string, status: string, node: string, image: string, startTime: string }> };

export type ServicePodsSubscriptionVariables = Exact<{
  serviceId: Scalars['String']['input'];
}>;


export type ServicePodsSubscription = { __typename?: 'Subscription', message: { __typename?: 'PodMessage', type: PodEventType, pod: { __typename?: 'Pod', name: string, status: string, node: string, image: string, startTime: string } } };

export type GetAddNodeCommandQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAddNodeCommandQuery = { __typename?: 'Query', command: string };

export type GetNodesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNodesQuery = { __typename?: 'Query', nodes: Array<{ __typename?: 'NodeEntity', id: string, name: string, ip: string, status: string, cpu: string, ram: string, storage: string }> };

export type RemoveNodeMutationVariables = Exact<{
  nodeId: Scalars['String']['input'];
}>;


export type RemoveNodeMutation = { __typename?: 'Mutation', removeNode: boolean };

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string, name: string, description?: string | null } };

export type GetProjectByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetProjectByIdQuery = { __typename?: 'Query', project: { __typename?: 'Project', id: string, name: string, description?: string | null } };

export type GetProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: string, name: string, description?: string | null }> };

export type CreateServiceMutationVariables = Exact<{
  createServiceInput: CreateServiceInput;
}>;


export type CreateServiceMutation = { __typename?: 'Mutation', createService: { __typename?: 'Service', id: string, name: string, projectId: string } };

export type DeployServiceMutationVariables = Exact<{
  serviceId: Scalars['String']['input'];
}>;


export type DeployServiceMutation = { __typename?: 'Mutation', deployService: boolean };

export type GetServiceDeploymentsQueryVariables = Exact<{
  serviceId: Scalars['String']['input'];
}>;


export type GetServiceDeploymentsQuery = { __typename?: 'Query', deployments: Array<{ __typename?: 'ServiceDeployment', id: string, serviceId: string, provider: ServiceDeploymentProvider, image: string, internalName?: string | null, replicas?: number | null, status: ServiceDeploymentStatus, cpuLimit?: number | null, memoryLimit?: number | null, createdAt: any, updatedAt: any }> };

export type ServiceDeploymentsSubscriptionVariables = Exact<{
  serviceId: Scalars['String']['input'];
}>;


export type ServiceDeploymentsSubscription = { __typename?: 'Subscription', payload: { __typename?: 'ServiceDeploymentEventMessage', event_type: ServiceDeploymentEventType, deployment: { __typename?: 'ServiceDeployment', id: string, serviceId: string, provider: ServiceDeploymentProvider, image: string, internalName?: string | null, replicas?: number | null, status: ServiceDeploymentStatus, cpuLimit?: number | null, memoryLimit?: number | null, createdAt: any, updatedAt: any } } };

export type UpdateServiceDeploymentMutationVariables = Exact<{
  updateServiceDeploymentInput: UpdateServiceDeploymentInput;
}>;


export type UpdateServiceDeploymentMutation = { __typename?: 'Mutation', updateServiceDeployment: { __typename?: 'ServiceDeployment', id: string, serviceId: string, provider: ServiceDeploymentProvider, image: string, internalName?: string | null, replicas?: number | null, status: ServiceDeploymentStatus, cpuLimit?: number | null, memoryLimit?: number | null } };

export type GetServicesByProjectIdQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type GetServicesByProjectIdQuery = { __typename?: 'Query', services: Array<{ __typename?: 'Service', id: string, name: string, projectId: string }> };

export type GetServiceByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetServiceByIdQuery = { __typename?: 'Query', service: { __typename?: 'Service', id: string, name: string, projectId: string } };

export type GetPodLogsQueryVariables = Exact<{
  podName: Scalars['String']['input'];
  serviceId: Scalars['String']['input'];
}>;


export type GetPodLogsQuery = { __typename?: 'Query', getPodLogs: Array<string> };

export type RestartPodMutationVariables = Exact<{
  podName: Scalars['String']['input'];
  serviceId: Scalars['String']['input'];
}>;


export type RestartPodMutation = { __typename?: 'Mutation', restartPod: boolean };

export type StopServiceMutationVariables = Exact<{
  serviceId: Scalars['String']['input'];
}>;


export type StopServiceMutation = { __typename?: 'Mutation', stopService: boolean };


export const AssignDomainToServiceDocument = gql`
    mutation AssignDomainToService($assignDomainInput: AssignDomainInput!) {
  assignDomainToService(assignDomainInput: $assignDomainInput)
}
    `;
export type AssignDomainToServiceMutationFn = Apollo.MutationFunction<AssignDomainToServiceMutation, AssignDomainToServiceMutationVariables>;

/**
 * __useAssignDomainToServiceMutation__
 *
 * To run a mutation, you first call `useAssignDomainToServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignDomainToServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignDomainToServiceMutation, { data, loading, error }] = useAssignDomainToServiceMutation({
 *   variables: {
 *      assignDomainInput: // value for 'assignDomainInput'
 *   },
 * });
 */
export function useAssignDomainToServiceMutation(baseOptions?: Apollo.MutationHookOptions<AssignDomainToServiceMutation, AssignDomainToServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AssignDomainToServiceMutation, AssignDomainToServiceMutationVariables>(AssignDomainToServiceDocument, options);
      }
export type AssignDomainToServiceMutationHookResult = ReturnType<typeof useAssignDomainToServiceMutation>;
export type AssignDomainToServiceMutationResult = Apollo.MutationResult<AssignDomainToServiceMutation>;
export type AssignDomainToServiceMutationOptions = Apollo.BaseMutationOptions<AssignDomainToServiceMutation, AssignDomainToServiceMutationVariables>;
export const CreateDomainDocument = gql`
    mutation CreateDomain($createDomainInput: CreateDomainInput!) {
  createDomain(createDomainInput: $createDomainInput) {
    id
    url
    createdAt
  }
}
    `;
export type CreateDomainMutationFn = Apollo.MutationFunction<CreateDomainMutation, CreateDomainMutationVariables>;

/**
 * __useCreateDomainMutation__
 *
 * To run a mutation, you first call `useCreateDomainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDomainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDomainMutation, { data, loading, error }] = useCreateDomainMutation({
 *   variables: {
 *      createDomainInput: // value for 'createDomainInput'
 *   },
 * });
 */
export function useCreateDomainMutation(baseOptions?: Apollo.MutationHookOptions<CreateDomainMutation, CreateDomainMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDomainMutation, CreateDomainMutationVariables>(CreateDomainDocument, options);
      }
export type CreateDomainMutationHookResult = ReturnType<typeof useCreateDomainMutation>;
export type CreateDomainMutationResult = Apollo.MutationResult<CreateDomainMutation>;
export type CreateDomainMutationOptions = Apollo.BaseMutationOptions<CreateDomainMutation, CreateDomainMutationVariables>;
export const GetDomainsDocument = gql`
    query GetDomains {
  domains: getDomains {
    id
    url
    createdAt
    status
  }
}
    `;

/**
 * __useGetDomainsQuery__
 *
 * To run a query within a React component, call `useGetDomainsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDomainsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDomainsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDomainsQuery(baseOptions?: Apollo.QueryHookOptions<GetDomainsQuery, GetDomainsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDomainsQuery, GetDomainsQueryVariables>(GetDomainsDocument, options);
      }
export function useGetDomainsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDomainsQuery, GetDomainsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDomainsQuery, GetDomainsQueryVariables>(GetDomainsDocument, options);
        }
export function useGetDomainsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDomainsQuery, GetDomainsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDomainsQuery, GetDomainsQueryVariables>(GetDomainsDocument, options);
        }
export type GetDomainsQueryHookResult = ReturnType<typeof useGetDomainsQuery>;
export type GetDomainsLazyQueryHookResult = ReturnType<typeof useGetDomainsLazyQuery>;
export type GetDomainsSuspenseQueryHookResult = ReturnType<typeof useGetDomainsSuspenseQuery>;
export type GetDomainsQueryResult = Apollo.QueryResult<GetDomainsQuery, GetDomainsQueryVariables>;
export const GetServiceDomainsDocument = gql`
    query GetServiceDomains($serviceId: String!) {
  domains: getServiceDomains(serviceId: $serviceId) {
    path
    domain
    port
  }
}
    `;

/**
 * __useGetServiceDomainsQuery__
 *
 * To run a query within a React component, call `useGetServiceDomainsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServiceDomainsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServiceDomainsQuery({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useGetServiceDomainsQuery(baseOptions: Apollo.QueryHookOptions<GetServiceDomainsQuery, GetServiceDomainsQueryVariables> & ({ variables: GetServiceDomainsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServiceDomainsQuery, GetServiceDomainsQueryVariables>(GetServiceDomainsDocument, options);
      }
export function useGetServiceDomainsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServiceDomainsQuery, GetServiceDomainsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServiceDomainsQuery, GetServiceDomainsQueryVariables>(GetServiceDomainsDocument, options);
        }
export function useGetServiceDomainsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetServiceDomainsQuery, GetServiceDomainsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetServiceDomainsQuery, GetServiceDomainsQueryVariables>(GetServiceDomainsDocument, options);
        }
export type GetServiceDomainsQueryHookResult = ReturnType<typeof useGetServiceDomainsQuery>;
export type GetServiceDomainsLazyQueryHookResult = ReturnType<typeof useGetServiceDomainsLazyQuery>;
export type GetServiceDomainsSuspenseQueryHookResult = ReturnType<typeof useGetServiceDomainsSuspenseQuery>;
export type GetServiceDomainsQueryResult = Apollo.QueryResult<GetServiceDomainsQuery, GetServiceDomainsQueryVariables>;
export const RemoveDomainFromServiceDocument = gql`
    mutation RemoveDomainFromService($serviceId: String!, $url: String!, $path: String!) {
  removeDomainFromService(serviceId: $serviceId, url: $url, path: $path)
}
    `;
export type RemoveDomainFromServiceMutationFn = Apollo.MutationFunction<RemoveDomainFromServiceMutation, RemoveDomainFromServiceMutationVariables>;

/**
 * __useRemoveDomainFromServiceMutation__
 *
 * To run a mutation, you first call `useRemoveDomainFromServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveDomainFromServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeDomainFromServiceMutation, { data, loading, error }] = useRemoveDomainFromServiceMutation({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *      url: // value for 'url'
 *      path: // value for 'path'
 *   },
 * });
 */
export function useRemoveDomainFromServiceMutation(baseOptions?: Apollo.MutationHookOptions<RemoveDomainFromServiceMutation, RemoveDomainFromServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveDomainFromServiceMutation, RemoveDomainFromServiceMutationVariables>(RemoveDomainFromServiceDocument, options);
      }
export type RemoveDomainFromServiceMutationHookResult = ReturnType<typeof useRemoveDomainFromServiceMutation>;
export type RemoveDomainFromServiceMutationResult = Apollo.MutationResult<RemoveDomainFromServiceMutation>;
export type RemoveDomainFromServiceMutationOptions = Apollo.BaseMutationOptions<RemoveDomainFromServiceMutation, RemoveDomainFromServiceMutationVariables>;
export const UpdateDomainStatusesDocument = gql`
    mutation UpdateDomainStatuses {
  updateDomainStatuses
}
    `;
export type UpdateDomainStatusesMutationFn = Apollo.MutationFunction<UpdateDomainStatusesMutation, UpdateDomainStatusesMutationVariables>;

/**
 * __useUpdateDomainStatusesMutation__
 *
 * To run a mutation, you first call `useUpdateDomainStatusesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDomainStatusesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDomainStatusesMutation, { data, loading, error }] = useUpdateDomainStatusesMutation({
 *   variables: {
 *   },
 * });
 */
export function useUpdateDomainStatusesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDomainStatusesMutation, UpdateDomainStatusesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDomainStatusesMutation, UpdateDomainStatusesMutationVariables>(UpdateDomainStatusesDocument, options);
      }
export type UpdateDomainStatusesMutationHookResult = ReturnType<typeof useUpdateDomainStatusesMutation>;
export type UpdateDomainStatusesMutationResult = Apollo.MutationResult<UpdateDomainStatusesMutation>;
export type UpdateDomainStatusesMutationOptions = Apollo.BaseMutationOptions<UpdateDomainStatusesMutation, UpdateDomainStatusesMutationVariables>;
export const CreateEnvironmentVariableDocument = gql`
    mutation CreateEnvironmentVariable($createEnvironmentVariableInput: CreateEnvironmentVariableInput!) {
  createEnvironmentVariable(
    createEnvironmentVariableInput: $createEnvironmentVariableInput
  ) {
    id
    name
    value
    scope
    updatedAt
    createdAt
  }
}
    `;
export type CreateEnvironmentVariableMutationFn = Apollo.MutationFunction<CreateEnvironmentVariableMutation, CreateEnvironmentVariableMutationVariables>;

/**
 * __useCreateEnvironmentVariableMutation__
 *
 * To run a mutation, you first call `useCreateEnvironmentVariableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEnvironmentVariableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEnvironmentVariableMutation, { data, loading, error }] = useCreateEnvironmentVariableMutation({
 *   variables: {
 *      createEnvironmentVariableInput: // value for 'createEnvironmentVariableInput'
 *   },
 * });
 */
export function useCreateEnvironmentVariableMutation(baseOptions?: Apollo.MutationHookOptions<CreateEnvironmentVariableMutation, CreateEnvironmentVariableMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEnvironmentVariableMutation, CreateEnvironmentVariableMutationVariables>(CreateEnvironmentVariableDocument, options);
      }
export type CreateEnvironmentVariableMutationHookResult = ReturnType<typeof useCreateEnvironmentVariableMutation>;
export type CreateEnvironmentVariableMutationResult = Apollo.MutationResult<CreateEnvironmentVariableMutation>;
export type CreateEnvironmentVariableMutationOptions = Apollo.BaseMutationOptions<CreateEnvironmentVariableMutation, CreateEnvironmentVariableMutationVariables>;
export const DeleteEnvironmentVariableDocument = gql`
    mutation DeleteEnvironmentVariable($id: String!) {
  deleteEnvironmentVariable(id: $id)
}
    `;
export type DeleteEnvironmentVariableMutationFn = Apollo.MutationFunction<DeleteEnvironmentVariableMutation, DeleteEnvironmentVariableMutationVariables>;

/**
 * __useDeleteEnvironmentVariableMutation__
 *
 * To run a mutation, you first call `useDeleteEnvironmentVariableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEnvironmentVariableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEnvironmentVariableMutation, { data, loading, error }] = useDeleteEnvironmentVariableMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEnvironmentVariableMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEnvironmentVariableMutation, DeleteEnvironmentVariableMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEnvironmentVariableMutation, DeleteEnvironmentVariableMutationVariables>(DeleteEnvironmentVariableDocument, options);
      }
export type DeleteEnvironmentVariableMutationHookResult = ReturnType<typeof useDeleteEnvironmentVariableMutation>;
export type DeleteEnvironmentVariableMutationResult = Apollo.MutationResult<DeleteEnvironmentVariableMutation>;
export type DeleteEnvironmentVariableMutationOptions = Apollo.BaseMutationOptions<DeleteEnvironmentVariableMutation, DeleteEnvironmentVariableMutationVariables>;
export const GetServiceEnvironmentVariablesDocument = gql`
    query GetServiceEnvironmentVariables($serviceId: String!) {
  variables: getServiceEnvironmentVariables(serviceId: $serviceId) {
    id
    name
    value
    scope
    updatedAt
    createdAt
  }
}
    `;

/**
 * __useGetServiceEnvironmentVariablesQuery__
 *
 * To run a query within a React component, call `useGetServiceEnvironmentVariablesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServiceEnvironmentVariablesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServiceEnvironmentVariablesQuery({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useGetServiceEnvironmentVariablesQuery(baseOptions: Apollo.QueryHookOptions<GetServiceEnvironmentVariablesQuery, GetServiceEnvironmentVariablesQueryVariables> & ({ variables: GetServiceEnvironmentVariablesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServiceEnvironmentVariablesQuery, GetServiceEnvironmentVariablesQueryVariables>(GetServiceEnvironmentVariablesDocument, options);
      }
export function useGetServiceEnvironmentVariablesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServiceEnvironmentVariablesQuery, GetServiceEnvironmentVariablesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServiceEnvironmentVariablesQuery, GetServiceEnvironmentVariablesQueryVariables>(GetServiceEnvironmentVariablesDocument, options);
        }
export function useGetServiceEnvironmentVariablesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetServiceEnvironmentVariablesQuery, GetServiceEnvironmentVariablesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetServiceEnvironmentVariablesQuery, GetServiceEnvironmentVariablesQueryVariables>(GetServiceEnvironmentVariablesDocument, options);
        }
export type GetServiceEnvironmentVariablesQueryHookResult = ReturnType<typeof useGetServiceEnvironmentVariablesQuery>;
export type GetServiceEnvironmentVariablesLazyQueryHookResult = ReturnType<typeof useGetServiceEnvironmentVariablesLazyQuery>;
export type GetServiceEnvironmentVariablesSuspenseQueryHookResult = ReturnType<typeof useGetServiceEnvironmentVariablesSuspenseQuery>;
export type GetServiceEnvironmentVariablesQueryResult = Apollo.QueryResult<GetServiceEnvironmentVariablesQuery, GetServiceEnvironmentVariablesQueryVariables>;
export const GetLoadBalancerIpDocument = gql`
    query GetLoadBalancerIP {
  ip: getLoadBalancerIP
}
    `;

/**
 * __useGetLoadBalancerIpQuery__
 *
 * To run a query within a React component, call `useGetLoadBalancerIpQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLoadBalancerIpQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLoadBalancerIpQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLoadBalancerIpQuery(baseOptions?: Apollo.QueryHookOptions<GetLoadBalancerIpQuery, GetLoadBalancerIpQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLoadBalancerIpQuery, GetLoadBalancerIpQueryVariables>(GetLoadBalancerIpDocument, options);
      }
export function useGetLoadBalancerIpLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLoadBalancerIpQuery, GetLoadBalancerIpQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLoadBalancerIpQuery, GetLoadBalancerIpQueryVariables>(GetLoadBalancerIpDocument, options);
        }
export function useGetLoadBalancerIpSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetLoadBalancerIpQuery, GetLoadBalancerIpQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetLoadBalancerIpQuery, GetLoadBalancerIpQueryVariables>(GetLoadBalancerIpDocument, options);
        }
export type GetLoadBalancerIpQueryHookResult = ReturnType<typeof useGetLoadBalancerIpQuery>;
export type GetLoadBalancerIpLazyQueryHookResult = ReturnType<typeof useGetLoadBalancerIpLazyQuery>;
export type GetLoadBalancerIpSuspenseQueryHookResult = ReturnType<typeof useGetLoadBalancerIpSuspenseQuery>;
export type GetLoadBalancerIpQueryResult = Apollo.QueryResult<GetLoadBalancerIpQuery, GetLoadBalancerIpQueryVariables>;
export const GetServicePodsDocument = gql`
    query getServicePods($serviceId: String!) {
  pods: getServicePods(serviceId: $serviceId) {
    name
    status
    node
    image
    startTime
  }
}
    `;

/**
 * __useGetServicePodsQuery__
 *
 * To run a query within a React component, call `useGetServicePodsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServicePodsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServicePodsQuery({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useGetServicePodsQuery(baseOptions: Apollo.QueryHookOptions<GetServicePodsQuery, GetServicePodsQueryVariables> & ({ variables: GetServicePodsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServicePodsQuery, GetServicePodsQueryVariables>(GetServicePodsDocument, options);
      }
export function useGetServicePodsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServicePodsQuery, GetServicePodsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServicePodsQuery, GetServicePodsQueryVariables>(GetServicePodsDocument, options);
        }
export function useGetServicePodsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetServicePodsQuery, GetServicePodsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetServicePodsQuery, GetServicePodsQueryVariables>(GetServicePodsDocument, options);
        }
export type GetServicePodsQueryHookResult = ReturnType<typeof useGetServicePodsQuery>;
export type GetServicePodsLazyQueryHookResult = ReturnType<typeof useGetServicePodsLazyQuery>;
export type GetServicePodsSuspenseQueryHookResult = ReturnType<typeof useGetServicePodsSuspenseQuery>;
export type GetServicePodsQueryResult = Apollo.QueryResult<GetServicePodsQuery, GetServicePodsQueryVariables>;
export const ServicePodsDocument = gql`
    subscription ServicePods($serviceId: String!) {
  message: servicePods(serviceId: $serviceId) {
    type
    pod {
      name
      status
      node
      image
      startTime
    }
  }
}
    `;

/**
 * __useServicePodsSubscription__
 *
 * To run a query within a React component, call `useServicePodsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useServicePodsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServicePodsSubscription({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useServicePodsSubscription(baseOptions: Apollo.SubscriptionHookOptions<ServicePodsSubscription, ServicePodsSubscriptionVariables> & ({ variables: ServicePodsSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ServicePodsSubscription, ServicePodsSubscriptionVariables>(ServicePodsDocument, options);
      }
export type ServicePodsSubscriptionHookResult = ReturnType<typeof useServicePodsSubscription>;
export type ServicePodsSubscriptionResult = Apollo.SubscriptionResult<ServicePodsSubscription>;
export const GetAddNodeCommandDocument = gql`
    query GetAddNodeCommand {
  command: getAddNodeCommand
}
    `;

/**
 * __useGetAddNodeCommandQuery__
 *
 * To run a query within a React component, call `useGetAddNodeCommandQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAddNodeCommandQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAddNodeCommandQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAddNodeCommandQuery(baseOptions?: Apollo.QueryHookOptions<GetAddNodeCommandQuery, GetAddNodeCommandQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAddNodeCommandQuery, GetAddNodeCommandQueryVariables>(GetAddNodeCommandDocument, options);
      }
export function useGetAddNodeCommandLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAddNodeCommandQuery, GetAddNodeCommandQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAddNodeCommandQuery, GetAddNodeCommandQueryVariables>(GetAddNodeCommandDocument, options);
        }
export function useGetAddNodeCommandSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAddNodeCommandQuery, GetAddNodeCommandQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAddNodeCommandQuery, GetAddNodeCommandQueryVariables>(GetAddNodeCommandDocument, options);
        }
export type GetAddNodeCommandQueryHookResult = ReturnType<typeof useGetAddNodeCommandQuery>;
export type GetAddNodeCommandLazyQueryHookResult = ReturnType<typeof useGetAddNodeCommandLazyQuery>;
export type GetAddNodeCommandSuspenseQueryHookResult = ReturnType<typeof useGetAddNodeCommandSuspenseQuery>;
export type GetAddNodeCommandQueryResult = Apollo.QueryResult<GetAddNodeCommandQuery, GetAddNodeCommandQueryVariables>;
export const GetNodesDocument = gql`
    query getNodes {
  nodes: getNodes {
    id
    name
    ip
    status
    cpu
    ram
    storage
  }
}
    `;

/**
 * __useGetNodesQuery__
 *
 * To run a query within a React component, call `useGetNodesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNodesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNodesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNodesQuery(baseOptions?: Apollo.QueryHookOptions<GetNodesQuery, GetNodesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNodesQuery, GetNodesQueryVariables>(GetNodesDocument, options);
      }
export function useGetNodesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNodesQuery, GetNodesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNodesQuery, GetNodesQueryVariables>(GetNodesDocument, options);
        }
export function useGetNodesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetNodesQuery, GetNodesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetNodesQuery, GetNodesQueryVariables>(GetNodesDocument, options);
        }
export type GetNodesQueryHookResult = ReturnType<typeof useGetNodesQuery>;
export type GetNodesLazyQueryHookResult = ReturnType<typeof useGetNodesLazyQuery>;
export type GetNodesSuspenseQueryHookResult = ReturnType<typeof useGetNodesSuspenseQuery>;
export type GetNodesQueryResult = Apollo.QueryResult<GetNodesQuery, GetNodesQueryVariables>;
export const RemoveNodeDocument = gql`
    mutation RemoveNode($nodeId: String!) {
  removeNode(nodeId: $nodeId)
}
    `;
export type RemoveNodeMutationFn = Apollo.MutationFunction<RemoveNodeMutation, RemoveNodeMutationVariables>;

/**
 * __useRemoveNodeMutation__
 *
 * To run a mutation, you first call `useRemoveNodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveNodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeNodeMutation, { data, loading, error }] = useRemoveNodeMutation({
 *   variables: {
 *      nodeId: // value for 'nodeId'
 *   },
 * });
 */
export function useRemoveNodeMutation(baseOptions?: Apollo.MutationHookOptions<RemoveNodeMutation, RemoveNodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveNodeMutation, RemoveNodeMutationVariables>(RemoveNodeDocument, options);
      }
export type RemoveNodeMutationHookResult = ReturnType<typeof useRemoveNodeMutation>;
export type RemoveNodeMutationResult = Apollo.MutationResult<RemoveNodeMutation>;
export type RemoveNodeMutationOptions = Apollo.BaseMutationOptions<RemoveNodeMutation, RemoveNodeMutationVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($input: CreateProjectInput!) {
  createProject(createProjectInput: $input) {
    id
    name
    description
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const GetProjectByIdDocument = gql`
    query GetProjectById($id: String!) {
  project: getProjectById(id: $id) {
    id
    name
    description
  }
}
    `;

/**
 * __useGetProjectByIdQuery__
 *
 * To run a query within a React component, call `useGetProjectByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProjectByIdQuery(baseOptions: Apollo.QueryHookOptions<GetProjectByIdQuery, GetProjectByIdQueryVariables> & ({ variables: GetProjectByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectByIdQuery, GetProjectByIdQueryVariables>(GetProjectByIdDocument, options);
      }
export function useGetProjectByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectByIdQuery, GetProjectByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectByIdQuery, GetProjectByIdQueryVariables>(GetProjectByIdDocument, options);
        }
export function useGetProjectByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProjectByIdQuery, GetProjectByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProjectByIdQuery, GetProjectByIdQueryVariables>(GetProjectByIdDocument, options);
        }
export type GetProjectByIdQueryHookResult = ReturnType<typeof useGetProjectByIdQuery>;
export type GetProjectByIdLazyQueryHookResult = ReturnType<typeof useGetProjectByIdLazyQuery>;
export type GetProjectByIdSuspenseQueryHookResult = ReturnType<typeof useGetProjectByIdSuspenseQuery>;
export type GetProjectByIdQueryResult = Apollo.QueryResult<GetProjectByIdQuery, GetProjectByIdQueryVariables>;
export const GetProjectsDocument = gql`
    query GetProjects {
  projects: getProjects {
    id
    name
    description
  }
}
    `;

/**
 * __useGetProjectsQuery__
 *
 * To run a query within a React component, call `useGetProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
      }
export function useGetProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
        }
export function useGetProjectsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
        }
export type GetProjectsQueryHookResult = ReturnType<typeof useGetProjectsQuery>;
export type GetProjectsLazyQueryHookResult = ReturnType<typeof useGetProjectsLazyQuery>;
export type GetProjectsSuspenseQueryHookResult = ReturnType<typeof useGetProjectsSuspenseQuery>;
export type GetProjectsQueryResult = Apollo.QueryResult<GetProjectsQuery, GetProjectsQueryVariables>;
export const CreateServiceDocument = gql`
    mutation CreateService($createServiceInput: CreateServiceInput!) {
  createService(createServiceInput: $createServiceInput) {
    id
    name
    projectId
  }
}
    `;
export type CreateServiceMutationFn = Apollo.MutationFunction<CreateServiceMutation, CreateServiceMutationVariables>;

/**
 * __useCreateServiceMutation__
 *
 * To run a mutation, you first call `useCreateServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createServiceMutation, { data, loading, error }] = useCreateServiceMutation({
 *   variables: {
 *      createServiceInput: // value for 'createServiceInput'
 *   },
 * });
 */
export function useCreateServiceMutation(baseOptions?: Apollo.MutationHookOptions<CreateServiceMutation, CreateServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateServiceMutation, CreateServiceMutationVariables>(CreateServiceDocument, options);
      }
export type CreateServiceMutationHookResult = ReturnType<typeof useCreateServiceMutation>;
export type CreateServiceMutationResult = Apollo.MutationResult<CreateServiceMutation>;
export type CreateServiceMutationOptions = Apollo.BaseMutationOptions<CreateServiceMutation, CreateServiceMutationVariables>;
export const DeployServiceDocument = gql`
    mutation DeployService($serviceId: String!) {
  deployService(serviceId: $serviceId)
}
    `;
export type DeployServiceMutationFn = Apollo.MutationFunction<DeployServiceMutation, DeployServiceMutationVariables>;

/**
 * __useDeployServiceMutation__
 *
 * To run a mutation, you first call `useDeployServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeployServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deployServiceMutation, { data, loading, error }] = useDeployServiceMutation({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useDeployServiceMutation(baseOptions?: Apollo.MutationHookOptions<DeployServiceMutation, DeployServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeployServiceMutation, DeployServiceMutationVariables>(DeployServiceDocument, options);
      }
export type DeployServiceMutationHookResult = ReturnType<typeof useDeployServiceMutation>;
export type DeployServiceMutationResult = Apollo.MutationResult<DeployServiceMutation>;
export type DeployServiceMutationOptions = Apollo.BaseMutationOptions<DeployServiceMutation, DeployServiceMutationVariables>;
export const GetServiceDeploymentsDocument = gql`
    query GetServiceDeployments($serviceId: String!) {
  deployments: getServiceDeployments(serviceId: $serviceId) {
    id
    serviceId
    provider
    image
    internalName
    replicas
    status
    cpuLimit
    memoryLimit
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetServiceDeploymentsQuery__
 *
 * To run a query within a React component, call `useGetServiceDeploymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServiceDeploymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServiceDeploymentsQuery({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useGetServiceDeploymentsQuery(baseOptions: Apollo.QueryHookOptions<GetServiceDeploymentsQuery, GetServiceDeploymentsQueryVariables> & ({ variables: GetServiceDeploymentsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServiceDeploymentsQuery, GetServiceDeploymentsQueryVariables>(GetServiceDeploymentsDocument, options);
      }
export function useGetServiceDeploymentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServiceDeploymentsQuery, GetServiceDeploymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServiceDeploymentsQuery, GetServiceDeploymentsQueryVariables>(GetServiceDeploymentsDocument, options);
        }
export function useGetServiceDeploymentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetServiceDeploymentsQuery, GetServiceDeploymentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetServiceDeploymentsQuery, GetServiceDeploymentsQueryVariables>(GetServiceDeploymentsDocument, options);
        }
export type GetServiceDeploymentsQueryHookResult = ReturnType<typeof useGetServiceDeploymentsQuery>;
export type GetServiceDeploymentsLazyQueryHookResult = ReturnType<typeof useGetServiceDeploymentsLazyQuery>;
export type GetServiceDeploymentsSuspenseQueryHookResult = ReturnType<typeof useGetServiceDeploymentsSuspenseQuery>;
export type GetServiceDeploymentsQueryResult = Apollo.QueryResult<GetServiceDeploymentsQuery, GetServiceDeploymentsQueryVariables>;
export const ServiceDeploymentsDocument = gql`
    subscription ServiceDeployments($serviceId: String!) {
  payload: serviceDeployments(serviceId: $serviceId) {
    event_type
    deployment {
      id
      serviceId
      provider
      image
      internalName
      replicas
      status
      cpuLimit
      memoryLimit
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useServiceDeploymentsSubscription__
 *
 * To run a query within a React component, call `useServiceDeploymentsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useServiceDeploymentsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServiceDeploymentsSubscription({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useServiceDeploymentsSubscription(baseOptions: Apollo.SubscriptionHookOptions<ServiceDeploymentsSubscription, ServiceDeploymentsSubscriptionVariables> & ({ variables: ServiceDeploymentsSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ServiceDeploymentsSubscription, ServiceDeploymentsSubscriptionVariables>(ServiceDeploymentsDocument, options);
      }
export type ServiceDeploymentsSubscriptionHookResult = ReturnType<typeof useServiceDeploymentsSubscription>;
export type ServiceDeploymentsSubscriptionResult = Apollo.SubscriptionResult<ServiceDeploymentsSubscription>;
export const UpdateServiceDeploymentDocument = gql`
    mutation UpdateServiceDeployment($updateServiceDeploymentInput: UpdateServiceDeploymentInput!) {
  updateServiceDeployment(
    updateServiceDeploymentInput: $updateServiceDeploymentInput
  ) {
    id
    serviceId
    provider
    image
    internalName
    replicas
    status
    cpuLimit
    memoryLimit
  }
}
    `;
export type UpdateServiceDeploymentMutationFn = Apollo.MutationFunction<UpdateServiceDeploymentMutation, UpdateServiceDeploymentMutationVariables>;

/**
 * __useUpdateServiceDeploymentMutation__
 *
 * To run a mutation, you first call `useUpdateServiceDeploymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateServiceDeploymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateServiceDeploymentMutation, { data, loading, error }] = useUpdateServiceDeploymentMutation({
 *   variables: {
 *      updateServiceDeploymentInput: // value for 'updateServiceDeploymentInput'
 *   },
 * });
 */
export function useUpdateServiceDeploymentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateServiceDeploymentMutation, UpdateServiceDeploymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateServiceDeploymentMutation, UpdateServiceDeploymentMutationVariables>(UpdateServiceDeploymentDocument, options);
      }
export type UpdateServiceDeploymentMutationHookResult = ReturnType<typeof useUpdateServiceDeploymentMutation>;
export type UpdateServiceDeploymentMutationResult = Apollo.MutationResult<UpdateServiceDeploymentMutation>;
export type UpdateServiceDeploymentMutationOptions = Apollo.BaseMutationOptions<UpdateServiceDeploymentMutation, UpdateServiceDeploymentMutationVariables>;
export const GetServicesByProjectIdDocument = gql`
    query GetServicesByProjectId($projectId: String!) {
  services: getServicesByProjectId(projectId: $projectId) {
    id
    name
    projectId
  }
}
    `;

/**
 * __useGetServicesByProjectIdQuery__
 *
 * To run a query within a React component, call `useGetServicesByProjectIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServicesByProjectIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServicesByProjectIdQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetServicesByProjectIdQuery(baseOptions: Apollo.QueryHookOptions<GetServicesByProjectIdQuery, GetServicesByProjectIdQueryVariables> & ({ variables: GetServicesByProjectIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServicesByProjectIdQuery, GetServicesByProjectIdQueryVariables>(GetServicesByProjectIdDocument, options);
      }
export function useGetServicesByProjectIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServicesByProjectIdQuery, GetServicesByProjectIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServicesByProjectIdQuery, GetServicesByProjectIdQueryVariables>(GetServicesByProjectIdDocument, options);
        }
export function useGetServicesByProjectIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetServicesByProjectIdQuery, GetServicesByProjectIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetServicesByProjectIdQuery, GetServicesByProjectIdQueryVariables>(GetServicesByProjectIdDocument, options);
        }
export type GetServicesByProjectIdQueryHookResult = ReturnType<typeof useGetServicesByProjectIdQuery>;
export type GetServicesByProjectIdLazyQueryHookResult = ReturnType<typeof useGetServicesByProjectIdLazyQuery>;
export type GetServicesByProjectIdSuspenseQueryHookResult = ReturnType<typeof useGetServicesByProjectIdSuspenseQuery>;
export type GetServicesByProjectIdQueryResult = Apollo.QueryResult<GetServicesByProjectIdQuery, GetServicesByProjectIdQueryVariables>;
export const GetServiceByIdDocument = gql`
    query GetServiceById($id: String!) {
  service: getServiceById(id: $id) {
    id
    name
    projectId
  }
}
    `;

/**
 * __useGetServiceByIdQuery__
 *
 * To run a query within a React component, call `useGetServiceByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServiceByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServiceByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetServiceByIdQuery(baseOptions: Apollo.QueryHookOptions<GetServiceByIdQuery, GetServiceByIdQueryVariables> & ({ variables: GetServiceByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServiceByIdQuery, GetServiceByIdQueryVariables>(GetServiceByIdDocument, options);
      }
export function useGetServiceByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServiceByIdQuery, GetServiceByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServiceByIdQuery, GetServiceByIdQueryVariables>(GetServiceByIdDocument, options);
        }
export function useGetServiceByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetServiceByIdQuery, GetServiceByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetServiceByIdQuery, GetServiceByIdQueryVariables>(GetServiceByIdDocument, options);
        }
export type GetServiceByIdQueryHookResult = ReturnType<typeof useGetServiceByIdQuery>;
export type GetServiceByIdLazyQueryHookResult = ReturnType<typeof useGetServiceByIdLazyQuery>;
export type GetServiceByIdSuspenseQueryHookResult = ReturnType<typeof useGetServiceByIdSuspenseQuery>;
export type GetServiceByIdQueryResult = Apollo.QueryResult<GetServiceByIdQuery, GetServiceByIdQueryVariables>;
export const GetPodLogsDocument = gql`
    query GetPodLogs($podName: String!, $serviceId: String!) {
  getPodLogs(podName: $podName, serviceId: $serviceId)
}
    `;

/**
 * __useGetPodLogsQuery__
 *
 * To run a query within a React component, call `useGetPodLogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPodLogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPodLogsQuery({
 *   variables: {
 *      podName: // value for 'podName'
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useGetPodLogsQuery(baseOptions: Apollo.QueryHookOptions<GetPodLogsQuery, GetPodLogsQueryVariables> & ({ variables: GetPodLogsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPodLogsQuery, GetPodLogsQueryVariables>(GetPodLogsDocument, options);
      }
export function useGetPodLogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPodLogsQuery, GetPodLogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPodLogsQuery, GetPodLogsQueryVariables>(GetPodLogsDocument, options);
        }
export function useGetPodLogsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPodLogsQuery, GetPodLogsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPodLogsQuery, GetPodLogsQueryVariables>(GetPodLogsDocument, options);
        }
export type GetPodLogsQueryHookResult = ReturnType<typeof useGetPodLogsQuery>;
export type GetPodLogsLazyQueryHookResult = ReturnType<typeof useGetPodLogsLazyQuery>;
export type GetPodLogsSuspenseQueryHookResult = ReturnType<typeof useGetPodLogsSuspenseQuery>;
export type GetPodLogsQueryResult = Apollo.QueryResult<GetPodLogsQuery, GetPodLogsQueryVariables>;
export const RestartPodDocument = gql`
    mutation RestartPod($podName: String!, $serviceId: String!) {
  restartPod(podName: $podName, serviceId: $serviceId)
}
    `;
export type RestartPodMutationFn = Apollo.MutationFunction<RestartPodMutation, RestartPodMutationVariables>;

/**
 * __useRestartPodMutation__
 *
 * To run a mutation, you first call `useRestartPodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestartPodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restartPodMutation, { data, loading, error }] = useRestartPodMutation({
 *   variables: {
 *      podName: // value for 'podName'
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useRestartPodMutation(baseOptions?: Apollo.MutationHookOptions<RestartPodMutation, RestartPodMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RestartPodMutation, RestartPodMutationVariables>(RestartPodDocument, options);
      }
export type RestartPodMutationHookResult = ReturnType<typeof useRestartPodMutation>;
export type RestartPodMutationResult = Apollo.MutationResult<RestartPodMutation>;
export type RestartPodMutationOptions = Apollo.BaseMutationOptions<RestartPodMutation, RestartPodMutationVariables>;
export const StopServiceDocument = gql`
    mutation StopService($serviceId: String!) {
  stopService(serviceId: $serviceId)
}
    `;
export type StopServiceMutationFn = Apollo.MutationFunction<StopServiceMutation, StopServiceMutationVariables>;

/**
 * __useStopServiceMutation__
 *
 * To run a mutation, you first call `useStopServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStopServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [stopServiceMutation, { data, loading, error }] = useStopServiceMutation({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useStopServiceMutation(baseOptions?: Apollo.MutationHookOptions<StopServiceMutation, StopServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StopServiceMutation, StopServiceMutationVariables>(StopServiceDocument, options);
      }
export type StopServiceMutationHookResult = ReturnType<typeof useStopServiceMutation>;
export type StopServiceMutationResult = Apollo.MutationResult<StopServiceMutation>;
export type StopServiceMutationOptions = Apollo.BaseMutationOptions<StopServiceMutation, StopServiceMutationVariables>;