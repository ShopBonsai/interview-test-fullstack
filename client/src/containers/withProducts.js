import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import React from "react";

const GET_PRODUCTS = gql`
  {
    merchants {
      guid
      merchant
      products {
        id
        name
        price
        description
        color
        size
        image
      }
    }
  }
`;

export const withProducts = (Component) => {
  const WrappedWithProducts = (props) => {
    return (
      <Query query={GET_PRODUCTS}>
        {({ data, loading }) => {
          return (
            <Component
              areMerchantsLoading={loading}
              merchants={data && data.merchants}
              {...props}
            />
          );
        }}
      </Query>
    );
  };

  WrappedWithProducts.displayName = "wrappedWithProducts";
  return WrappedWithProducts;
};
