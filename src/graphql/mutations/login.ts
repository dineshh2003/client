// src/graphql/mutations/login.ts
import { gql } from '@apollo/client';

// Export the interfaces
export interface Account {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface LoginQueryResponse {
  getAccountByID: Account;
}

export interface LoginQueryVariables {
  email: string;
  password: string;
}

// The GraphQL query
export const LOGIN_QUERY = gql`
  query GetAccountByID($email: String!, $password: String!) {
    getAccountByID(email: $email, password: $password) {
      id
      name
      email
      password
    }
  }
`;