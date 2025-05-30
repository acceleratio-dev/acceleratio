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

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String']['output'];
};

/** The status of a container */
export enum ContainerStatus {
  Pending = 'PENDING',
  Running = 'RUNNING',
  Stopped = 'STOPPED'
}

export type CreateProjectInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateServiceInput = {
  config: DeploymentConfigInput;
  name: Scalars['String']['input'];
  projectId: Scalars['String']['input'];
  type: ServiceType;
};

export type Deployment = {
  __typename?: 'Deployment';
  _id: Scalars['ID']['output'];
  config: DeploymentConfig;
  containerId: Maybe<Scalars['String']['output']>;
  containerStatus: Maybe<ContainerStatus>;
  createdAt: Scalars['DateTime']['output'];
  serviceId: Scalars['String']['output'];
  status: DeploymentStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type DeploymentConfig = {
  __typename?: 'DeploymentConfig';
  cpuLimit: Maybe<Scalars['Float']['output']>;
  domains: Maybe<Array<Domain>>;
  image: Scalars['String']['output'];
  memoryLimit: Maybe<Scalars['Float']['output']>;
};

export type DeploymentConfigInput = {
  cpuLimit: InputMaybe<Scalars['Float']['input']>;
  image: Scalars['String']['input'];
  memoryLimit: InputMaybe<Scalars['Float']['input']>;
};

export type DeploymentConfigUpdateInput = {
  cpuLimit: InputMaybe<Scalars['Float']['input']>;
  image: InputMaybe<Scalars['String']['input']>;
  memoryLimit: InputMaybe<Scalars['Float']['input']>;
};

/** The status of a deployment */
export enum DeploymentStatus {
  Active = 'ACTIVE',
  Draft = 'DRAFT',
  Finished = 'FINISHED'
}

export type Domain = {
  __typename?: 'Domain';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  domain: Scalars['String']['output'];
  path: Scalars['String']['output'];
  status: DomainStatus;
};

export enum DomainStatus {
  Verified = 'VERIFIED',
  Verifying = 'VERIFYING'
}

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject: Project;
  createService: Scalars['Boolean']['output'];
  deleteProject: Scalars['Boolean']['output'];
  initSwarm: Scalars['Boolean']['output'];
  login: AuthResponse;
  startService: Scalars['Boolean']['output'];
  stopService: Scalars['Boolean']['output'];
  updateProject: Project;
  updateServiceConfig: Scalars['Boolean']['output'];
};


export type MutationCreateProjectArgs = {
  createProjectInput: CreateProjectInput;
};


export type MutationCreateServiceArgs = {
  input: CreateServiceInput;
};


export type MutationDeleteProjectArgs = {
  id: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationStartServiceArgs = {
  serviceId: Scalars['String']['input'];
};


export type MutationStopServiceArgs = {
  serviceId: Scalars['String']['input'];
};


export type MutationUpdateProjectArgs = {
  id: Scalars['String']['input'];
  updateProjectInput: UpdateProjectInput;
};


export type MutationUpdateServiceConfigArgs = {
  config: DeploymentConfigUpdateInput;
  serviceId: Scalars['String']['input'];
};

export type Project = {
  __typename?: 'Project';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  getNodes: Array<Server>;
  getProjectById: Project;
  getProjectServices: Array<ServiceWithDeployment>;
  getProjects: Array<Project>;
  getServiceById: ServiceWithDeployment;
  getServiceDeployments: Array<Deployment>;
  getUsers: Array<User>;
  isSwarmInitialized: Scalars['Boolean']['output'];
};


export type QueryGetProjectByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetProjectServicesArgs = {
  projectId: Scalars['String']['input'];
};


export type QueryGetServiceByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetServiceDeploymentsArgs = {
  serviceId: Scalars['String']['input'];
};

export type Server = {
  __typename?: 'Server';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  ip: Scalars['String']['output'];
  name: Scalars['String']['output'];
  nodeId: Scalars['String']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

/** The type of a service */
export enum ServiceType {
  Docker = 'DOCKER'
}

export type ServiceWithDeployment = {
  __typename?: 'ServiceWithDeployment';
  _id: Scalars['ID']['output'];
  activeDeployment: Maybe<Deployment>;
  createdAt: Scalars['DateTime']['output'];
  draftDeployment: Maybe<Deployment>;
  name: Scalars['String']['output'];
  projectId: Scalars['String']['output'];
  type: ServiceType;
  updatedAt: Scalars['DateTime']['output'];
};

export type UpdateProjectInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  email: Scalars['String']['output'];
  password: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type GetServiceByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetServiceByIdQuery = { __typename?: 'Query', service: { __typename?: 'ServiceWithDeployment', _id: string, name: string, projectId: string, type: ServiceType, createdAt: any, updatedAt: any, activeDeployment: { __typename?: 'Deployment', status: DeploymentStatus, containerStatus: ContainerStatus | null, createdAt: any, updatedAt: any, config: { __typename?: 'DeploymentConfig', image: string, cpuLimit: number | null, memoryLimit: number | null } } | null, draftDeployment: { __typename?: 'Deployment', status: DeploymentStatus, containerStatus: ContainerStatus | null, createdAt: any, updatedAt: any, config: { __typename?: 'DeploymentConfig', image: string, cpuLimit: number | null, memoryLimit: number | null } } | null } };


export const GetServiceByIdDocument = gql`
    query getServiceById($id: String!) {
  service: getServiceById(id: $id) {
    _id
    name
    projectId
    type
    createdAt
    updatedAt
    activeDeployment {
      status
      containerStatus
      config {
        image
        cpuLimit
        memoryLimit
      }
      createdAt
      updatedAt
    }
    draftDeployment {
      status
      containerStatus
      config {
        image
        cpuLimit
        memoryLimit
      }
      createdAt
      updatedAt
    }
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