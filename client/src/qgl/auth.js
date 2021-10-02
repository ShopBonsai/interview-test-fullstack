import { gql } from '@apollo/client';

export const REGISTER_MUTATION = gql`
  mutation RegisterMutation($data: RegisterInput!) {
    register(data: $data) {
      token
      userId
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
