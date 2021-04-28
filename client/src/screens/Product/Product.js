import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const Product = () => {
  const GET_PRODUCT = gql`
    {
      findProduct() {
        guid
        merchant_name
        products {
          id
          product_name
          price
          description
          color
          size
          quantity
          image_url
        }
      }
    }
  `;

  const withProducts = Component => props => {
    return (
      <Query query={GET_PRODUCTS}>
        {({ loading, data }) => {
          debugger;
        }}
      </Query>
    );
  };

  const { id } = useParams();

  return (
    <>
      <p>Product</p>
    </>
  );
};

export default Product;
