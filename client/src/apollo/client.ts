import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

import { isLoggedInVar } from "./variables";

const httpLink = createHttpLink({
  uri: "http://localhost:3000/graphql",
  credentials: "include",
});

const cache: any = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
      },
    },
  },
});

export const client = new ApolloClient({
  cache,
  link: httpLink,
});

export default client;
