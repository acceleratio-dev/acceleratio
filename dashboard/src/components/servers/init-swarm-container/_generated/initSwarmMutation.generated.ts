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
  cpuLimit: Maybe<Scalars['Int']['output']>;
  image: Scalars['String']['output'];
  memoryLimit: Maybe<Scalars['Int']['output']>;
};

export type DeploymentConfigInput = {
  cpuLimit: InputMaybe<Scalars['Int']['input']>;
  image: Scalars['String']['input'];
  memoryLimit: InputMaybe<Scalars['Int']['input']>;
};

export type DeploymentConfigUpdateInput = {
  cpuLimit: InputMaybe<Scalars['Int']['input']>;
  image: InputMaybe<Scalars['String']['input']>;
  memoryLimit: InputMaybe<Scalars['Int']['input']>;
};

/** The status of a deployment */
export enum DeploymentStatus {
  Active = 'ACTIVE',
  Draft = 'DRAFT',
  Finished = 'FINISHED'
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

export type InitSwarmMutationVariables = Exact<{ [key: string]: never; }>;


export type InitSwarmMutation = { __typename?: 'Mutation', initSwarm: boolean };


export const InitSwarmDocument = gql`
    mutation InitSwarm {
  initSwarm
}
    `;
export type InitSwarmMutationFn = Apollo.MutationFunction<InitSwarmMutation, InitSwarmMutationVariables>;

/**
 * __useInitSwarmMutation__
 *
 * To run a mutation, you first call `useInitSwarmMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInitSwarmMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [initSwarmMutation, { data, loading, error }] = useInitSwarmMutation({
 *   variables: {
 *   },
 * });
 */
export function useInitSwarmMutation(baseOptions?: Apollo.MutationHookOptions<InitSwarmMutation, InitSwarmMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InitSwarmMutation, InitSwarmMutationVariables>(InitSwarmDocument, options);
      }
export type InitSwarmMutationHookResult = ReturnType<typeof useInitSwarmMutation>;
export type InitSwarmMutationResult = Apollo.MutationResult<InitSwarmMutation>;
export type InitSwarmMutationOptions = Apollo.BaseMutationOptions<InitSwarmMutation, InitSwarmMutationVariables>;