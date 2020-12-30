const gql = require("apollo-boost").gql;
const { ApolloServer } = require("apollo-server-express");

const { createTestClient } = require("apollo-server-testing");

const typeDefs = require("./modules/merchant/graphqlSchema");
const resolvers = require("./modules/merchant/resolvers");

const server = new ApolloServer({ typeDefs, resolvers });
const { query } = createTestClient(server);

const SEARCH_ALL_QUERY = gql`
  query($type: SearchType!, $text: String!) {
    search(type: $type, text: $text) {
      guid
      merchant
      brands
      products {
        id
        name
        price
        description
      }
    }
  }
`;

describe("Server Test", () => {
  afterEach(async () => {
    await server.stop();
  });

  it("Search By Merchant Name", async () => {
    const res = await query({
      query: SEARCH_ALL_QUERY,
      variables: { type: "MERCHANT", text: "ZILLIDIUM" },
    });

    expect(res.data.search[0].merchant).toEqual('ZILLIDIUM');
  });

  it("Search By Brand Name", async () => {

    const res = await query({
      query: SEARCH_ALL_QUERY,
      variables: { type: "BRAND", text: "Caroline Butler" },
    });

    expect(res.data.search[0].brands).toContain('Caroline Butler');
  });

  it("Search By Product Name", async () => {
    const res = await query({
      query: SEARCH_ALL_QUERY,
      variables: { type: "PRODUCT", text: "CONSECTETUR Cummerbund" },
    });

    expect(res.data.search[0].products[0].name).toEqual('CONSECTETUR Cummerbund');
  });
});
