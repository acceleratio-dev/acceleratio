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

export type CreateProjectInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateServiceInput = {
  config?: InputMaybe<DeploymentConfigInput>;
  deploymentProvider: DeploymentProvider;
  name: Scalars['String']['input'];
  projectId: Scalars['ID']['input'];
};

export type Deployment = {
  __typename?: 'Deployment';
  config: DeploymentConfig;
  id: Scalars['ID']['output'];
  kubernetesName?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  provider: DeploymentProvider;
  serviceId: Scalars['ID']['output'];
  status: DeploymentStatus;
  triggered_by?: Maybe<Scalars['String']['output']>;
};

export type DeploymentConfig = {
  __typename?: 'DeploymentConfig';
  image?: Maybe<Scalars['String']['output']>;
};

export type DeploymentConfigInput = {
  image?: InputMaybe<Scalars['String']['input']>;
};

export enum DeploymentProvider {
  Docker = 'DOCKER',
  Git = 'GIT'
}

export enum DeploymentStatus {
  Active = 'ACTIVE',
  Draft = 'DRAFT',
  Finished = 'FINISHED'
}

export type Mutation = {
  __typename?: 'Mutation';
  createProject: Project;
  createService: Service;
  startServiceDeployment: Scalars['Boolean']['output'];
  stopServiceDeployment: Scalars['Boolean']['output'];
};


export type MutationCreateProjectArgs = {
  createProjectInput: CreateProjectInput;
};


export type MutationCreateServiceArgs = {
  createServiceInput: CreateServiceInput;
};


export type MutationStartServiceDeploymentArgs = {
  serviceId: Scalars['String']['input'];
};


export type MutationStopServiceDeploymentArgs = {
  serviceId: Scalars['String']['input'];
};

export type Node = {
  __typename?: 'Node';
  createdAt: Scalars['DateTime']['output'];
  externalIp: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  role: Scalars['String']['output'];
  status: Scalars['String']['output'];
  systemUuid: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Pod = {
  __typename?: 'Pod';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  kubernetesUid: Scalars['String']['output'];
  name: Scalars['String']['output'];
  namespace: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type Project = {
  __typename?: 'Project';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  firstUserCreated: Scalars['Boolean']['output'];
  getNodes: Array<Node>;
  getProjectById: Project;
  getProjectServices: Array<ServiceWithDeployments>;
  getProjects: Array<Project>;
  pods: Array<Pod>;
};


export type QueryGetProjectByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetProjectServicesArgs = {
  projectId: Scalars['String']['input'];
};

export type Service = {
  __typename?: 'Service';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  projectId: Scalars['ID']['output'];
};

export type ServiceWithDeployments = {
  __typename?: 'ServiceWithDeployments';
  activeDeployment?: Maybe<Deployment>;
  draftDeployment?: Maybe<Deployment>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  projectId: Scalars['ID']['output'];
};

export type GetNodesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNodesQuery = { __typename?: 'Query', nodes: Array<{ __typename?: 'Node', id: string, name: string, role: string, status: string, externalIp: string, systemUuid: string, createdAt: any, updatedAt: any }> };

export type CreateProjectMutationVariables = Exact<{
  createProjectInput: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string, name: string, description: string, createdAt: any, updatedAt: any } };

export type GetProjectByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetProjectByIdQuery = { __typename?: 'Query', project: { __typename?: 'Project', id: string, name: string, description: string, createdAt: any, updatedAt: any } };

export type GetProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: string, name: string, description: string, createdAt: any, updatedAt: any }> };

export type CreateServiceMutationVariables = Exact<{
  createServiceInput: CreateServiceInput;
}>;


export type CreateServiceMutation = { __typename?: 'Mutation', createService: { __typename?: 'Service', id: string, name: string, projectId: string } };

export type GetProjectServicesQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type GetProjectServicesQuery = { __typename?: 'Query', services: Array<{ __typename?: 'ServiceWithDeployments', id: string, name: string, activeDeployment?: { __typename?: 'Deployment', id: string, config: { __typename?: 'DeploymentConfig', image?: string | null } } | null, draftDeployment?: { __typename?: 'Deployment', id: string, config: { __typename?: 'DeploymentConfig', image?: string | null } } | null }> };

export type StartServiceDeploymentMutationVariables = Exact<{
  serviceId: Scalars['String']['input'];
}>;


export type StartServiceDeploymentMutation = { __typename?: 'Mutation', startServiceDeployment: boolean };

export type StopServiceDeploymentMutationVariables = Exact<{
  serviceId: Scalars['String']['input'];
}>;


export type StopServiceDeploymentMutation = { __typename?: 'Mutation', stopServiceDeployment: boolean };

export type FirstUserCreatedQueryVariables = Exact<{ [key: string]: never; }>;


export type FirstUserCreatedQuery = { __typename?: 'Query', firstUserCreated: boolean };


export const GetNodesDocument = gql`
    query getNodes {
  nodes: getNodes {
    id
    name
    role
    status
    externalIp
    systemUuid
    createdAt
    updatedAt
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
export const CreateProjectDocument = gql`
    mutation CreateProject($createProjectInput: CreateProjectInput!) {
  createProject(createProjectInput: $createProjectInput) {
    id
    name
    description
    createdAt
    updatedAt
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
 *      createProjectInput: // value for 'createProjectInput'
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
    createdAt
    updatedAt
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
    createdAt
    updatedAt
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
export const GetProjectServicesDocument = gql`
    query GetProjectServices($projectId: String!) {
  services: getProjectServices(projectId: $projectId) {
    id
    name
    activeDeployment {
      id
      config {
        image
      }
    }
    draftDeployment {
      id
      config {
        image
      }
    }
  }
}
    `;

/**
 * __useGetProjectServicesQuery__
 *
 * To run a query within a React component, call `useGetProjectServicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectServicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectServicesQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetProjectServicesQuery(baseOptions: Apollo.QueryHookOptions<GetProjectServicesQuery, GetProjectServicesQueryVariables> & ({ variables: GetProjectServicesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectServicesQuery, GetProjectServicesQueryVariables>(GetProjectServicesDocument, options);
      }
export function useGetProjectServicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectServicesQuery, GetProjectServicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectServicesQuery, GetProjectServicesQueryVariables>(GetProjectServicesDocument, options);
        }
export function useGetProjectServicesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProjectServicesQuery, GetProjectServicesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProjectServicesQuery, GetProjectServicesQueryVariables>(GetProjectServicesDocument, options);
        }
export type GetProjectServicesQueryHookResult = ReturnType<typeof useGetProjectServicesQuery>;
export type GetProjectServicesLazyQueryHookResult = ReturnType<typeof useGetProjectServicesLazyQuery>;
export type GetProjectServicesSuspenseQueryHookResult = ReturnType<typeof useGetProjectServicesSuspenseQuery>;
export type GetProjectServicesQueryResult = Apollo.QueryResult<GetProjectServicesQuery, GetProjectServicesQueryVariables>;
export const StartServiceDeploymentDocument = gql`
    mutation StartServiceDeployment($serviceId: String!) {
  startServiceDeployment(serviceId: $serviceId)
}
    `;
export type StartServiceDeploymentMutationFn = Apollo.MutationFunction<StartServiceDeploymentMutation, StartServiceDeploymentMutationVariables>;

/**
 * __useStartServiceDeploymentMutation__
 *
 * To run a mutation, you first call `useStartServiceDeploymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartServiceDeploymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startServiceDeploymentMutation, { data, loading, error }] = useStartServiceDeploymentMutation({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useStartServiceDeploymentMutation(baseOptions?: Apollo.MutationHookOptions<StartServiceDeploymentMutation, StartServiceDeploymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartServiceDeploymentMutation, StartServiceDeploymentMutationVariables>(StartServiceDeploymentDocument, options);
      }
export type StartServiceDeploymentMutationHookResult = ReturnType<typeof useStartServiceDeploymentMutation>;
export type StartServiceDeploymentMutationResult = Apollo.MutationResult<StartServiceDeploymentMutation>;
export type StartServiceDeploymentMutationOptions = Apollo.BaseMutationOptions<StartServiceDeploymentMutation, StartServiceDeploymentMutationVariables>;
export const StopServiceDeploymentDocument = gql`
    mutation StopServiceDeployment($serviceId: String!) {
  stopServiceDeployment(serviceId: $serviceId)
}
    `;
export type StopServiceDeploymentMutationFn = Apollo.MutationFunction<StopServiceDeploymentMutation, StopServiceDeploymentMutationVariables>;

/**
 * __useStopServiceDeploymentMutation__
 *
 * To run a mutation, you first call `useStopServiceDeploymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStopServiceDeploymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [stopServiceDeploymentMutation, { data, loading, error }] = useStopServiceDeploymentMutation({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useStopServiceDeploymentMutation(baseOptions?: Apollo.MutationHookOptions<StopServiceDeploymentMutation, StopServiceDeploymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StopServiceDeploymentMutation, StopServiceDeploymentMutationVariables>(StopServiceDeploymentDocument, options);
      }
export type StopServiceDeploymentMutationHookResult = ReturnType<typeof useStopServiceDeploymentMutation>;
export type StopServiceDeploymentMutationResult = Apollo.MutationResult<StopServiceDeploymentMutation>;
export type StopServiceDeploymentMutationOptions = Apollo.BaseMutationOptions<StopServiceDeploymentMutation, StopServiceDeploymentMutationVariables>;
export const FirstUserCreatedDocument = gql`
    query FirstUserCreated {
  firstUserCreated
}
    `;

/**
 * __useFirstUserCreatedQuery__
 *
 * To run a query within a React component, call `useFirstUserCreatedQuery` and pass it any options that fit your needs.
 * When your component renders, `useFirstUserCreatedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFirstUserCreatedQuery({
 *   variables: {
 *   },
 * });
 */
export function useFirstUserCreatedQuery(baseOptions?: Apollo.QueryHookOptions<FirstUserCreatedQuery, FirstUserCreatedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FirstUserCreatedQuery, FirstUserCreatedQueryVariables>(FirstUserCreatedDocument, options);
      }
export function useFirstUserCreatedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FirstUserCreatedQuery, FirstUserCreatedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FirstUserCreatedQuery, FirstUserCreatedQueryVariables>(FirstUserCreatedDocument, options);
        }
export function useFirstUserCreatedSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FirstUserCreatedQuery, FirstUserCreatedQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FirstUserCreatedQuery, FirstUserCreatedQueryVariables>(FirstUserCreatedDocument, options);
        }
export type FirstUserCreatedQueryHookResult = ReturnType<typeof useFirstUserCreatedQuery>;
export type FirstUserCreatedLazyQueryHookResult = ReturnType<typeof useFirstUserCreatedLazyQuery>;
export type FirstUserCreatedSuspenseQueryHookResult = ReturnType<typeof useFirstUserCreatedSuspenseQuery>;
export type FirstUserCreatedQueryResult = Apollo.QueryResult<FirstUserCreatedQuery, FirstUserCreatedQueryVariables>;