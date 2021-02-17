import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  // NOTE: hostname should never be hardcoded, it should
  // be pulled from an env var for composability
  uri: `${process.env.APOLLO_CLIENT_HOST}/graphql`,
});

export default client;
