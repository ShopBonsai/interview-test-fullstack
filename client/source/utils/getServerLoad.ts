import { gql } from "@apollo/client";
import client from "../createApolloClient";

const ADD_ACCESS = gql`
  mutation addDatabaseAccess($loadTime: Int!) {
    addDatabaseAccess(loadTime: $loadTime) {
      accessCount
    }
  }
`;

let timer = 0;

export const timerStart = () => {
  timer = Date.now();
};

export const timerEnd = () => {
  const result = Date.now() - timer;
  client.mutate({
    mutation: ADD_ACCESS,
    variables: {
      loadTime: result,
    },
  });
};
