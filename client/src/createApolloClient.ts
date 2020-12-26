import {
    ApolloClient,
    NormalizedCacheObject,
    InMemoryCache,
} from '@apollo/client';

const client = new ApolloClient<NormalizedCacheObject>({
    cache: new InMemoryCache({}),
    uri: 'http://localhost:3000/graphql',
});

export default client;
