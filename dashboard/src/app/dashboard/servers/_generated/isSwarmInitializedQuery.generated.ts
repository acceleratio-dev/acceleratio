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

export type CreateProjectInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject: Project;
  initSwarm: Scalars['Boolean']['output'];
  login: AuthResponse;
};


export type MutationCreateProjectArgs = {
  createProjectInput: CreateProjectInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
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
  getProjects: Array<Project>;
  getUsers: Array<User>;
  isSwarmInitialized: Scalars['Boolean']['output'];
};


export type QueryGetProjectByIdArgs = {
  id: Scalars['String']['input'];
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

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  email: Scalars['String']['output'];
  password: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type IsSwarmInitializedQueryVariables = Exact<{ [key: string]: never; }>;


export type IsSwarmInitializedQuery = { __typename?: 'Query', isSwarmInitialized: boolean };


export const IsSwarmInitializedDocument = gql`
    query IsSwarmInitialized {
  isSwarmInitialized
}
    `;

/**
 * __useIsSwarmInitializedQuery__
 *
 * To run a query within a React component, call `useIsSwarmInitializedQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsSwarmInitializedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsSwarmInitializedQuery({
 *   variables: {
 *   },
 * });
 */
export function useIsSwarmInitializedQuery(baseOptions?: Apollo.QueryHookOptions<IsSwarmInitializedQuery, IsSwarmInitializedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsSwarmInitializedQuery, IsSwarmInitializedQueryVariables>(IsSwarmInitializedDocument, options);
      }
export function useIsSwarmInitializedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsSwarmInitializedQuery, IsSwarmInitializedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsSwarmInitializedQuery, IsSwarmInitializedQueryVariables>(IsSwarmInitializedDocument, options);
        }
export function useIsSwarmInitializedSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<IsSwarmInitializedQuery, IsSwarmInitializedQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<IsSwarmInitializedQuery, IsSwarmInitializedQueryVariables>(IsSwarmInitializedDocument, options);
        }
export type IsSwarmInitializedQueryHookResult = ReturnType<typeof useIsSwarmInitializedQuery>;
export type IsSwarmInitializedLazyQueryHookResult = ReturnType<typeof useIsSwarmInitializedLazyQuery>;
export type IsSwarmInitializedSuspenseQueryHookResult = ReturnType<typeof useIsSwarmInitializedSuspenseQuery>;
export type IsSwarmInitializedQueryResult = Apollo.QueryResult<IsSwarmInitializedQuery, IsSwarmInitializedQueryVariables>;