import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { ProductList } from './product-list.component';

export const GET_PRODUCTS = gql`
  query merchants {
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

const Products = () => {
  const { loading: productsLoading, data: productsData, fetchMore } = useQuery(GET_PRODUCTS);

  const productList = () => {
    const { merchants = [] } = productsData || {};

    if (!productsLoading && merchants && merchants.length > 0) {
      return merchants.map(({ guid, products }) => {
        return products && products.length > 0 && <ProductList key={guid} products={products} />;
      });
    } else {
      return (
        <div>
          <h3>No products available</h3>
        </div>
      );
    }
  };

  return <div>{productList()}</div>;
};

export default Products;
