import ApolloClient from 'apollo-boost';
import fetch from 'unfetch'

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  fetch
});

export default client;
