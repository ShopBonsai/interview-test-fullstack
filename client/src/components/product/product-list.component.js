import React from 'react';
import { ProductCard } from './product-card.component';

import './product-list.css';

export const ProductList = (props) => {
  return (
    <div className="product-list">
      {props.products.map((product) => (
        <ProductCard key={product.id} product={product}></ProductCard>
      ))}
    </div>
  );
};
