import { gql } from "@apollo/client";

export const LOGIN = gql`
  query Me {
    me {
      email
      profile {
        name
      }
    }
  }
`;

export const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;
