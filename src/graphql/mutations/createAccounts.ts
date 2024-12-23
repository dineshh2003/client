import { gql } from '@apollo/client';

export interface Account {
  id: string;
  name: string;
  email: string;
}

export interface CreateAccountResponse {
  createAccount: Account;
}

export interface CreateAccountVariables {
  name: string;
  email: string;
  password: string;
}

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccount($name: String!, $email: String!, $password: String!) {
    createAccount(Account: { name: $name, email: $email, password: $password }) {
      id
      name
      email
    }
  }
`;
