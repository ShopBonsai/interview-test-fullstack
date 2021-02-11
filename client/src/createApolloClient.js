import { ApolloClient, InMemoryCache } from "@apollo/client";

export const createApolloClient = () =>
  new ApolloClient({
    uri: "http://localhost:3000/graphql",
    cache: new InMemoryCache(),
  });
