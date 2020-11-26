import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import PropTypes from 'prop-types';
import CartContents from './CartContents';

const GET_CART_PRODUCTS = gql`
  {
    cart {
      productId
      name
      quantity
      price
    }
  }
`;
export { GET_CART_PRODUCTS };

const withCartProducts = Component => props => {
  return (
    <Query query={GET_CART_PRODUCTS}>
      {({ loading, data: { cart: cartProducts } }) => {
        return (
          <Component cartLoading={loading} cartProducts={cartProducts} {...props} />
        );
      }}
    </Query>
  );
};



const Cart = props => (
  <>
    <h1>
      Cart
    </h1>
    <CartContents {...props} />
  </>
);

Cart.propTypes = {
  cartLoading: PropTypes.bool.isRequired,
  cartProducts: PropTypes.array.isRequired,
};

Cart.defaultProps = {
  cartLoading: false,
  cartProducts: [],
};

export default withCartProducts(Cart);

