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

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  initSwarm: Scalars['Boolean']['output'];
  login: AuthResponse;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};

export type Query = {
  __typename?: 'Query';
  getNodes: Array<Server>;
  getUsers: Array<User>;
  isSwarmInitialized: Scalars['Boolean']['output'];
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