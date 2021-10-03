import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_PRODUCTS } from '../qgl/products';

import { ProductList } from '../components/product/product-list.component';
import Loader from '../components/loader/loader.component';
import EmptyView from '../components/empty-view.component';

const Products = () => {
  const { loading: productsLoading = true, data: productsData } = useQuery(GET_PRODUCTS);

  if (productsLoading) return <Loader />;

  const productList = () => {
    const { merchants = [] } = productsData || {};

    if (!productsLoading && merchants && merchants.length > 0) {
      return merchants.map(({ guid, products }) => {
        return products && products.length > 0 && <ProductList key={guid} products={products} />;
      });
    } else {
      return <EmptyView message={'No products available'} />;
    }
  };

  return <div>{productList()}</div>;
};

export default Products;
