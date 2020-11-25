import TagManager from 'react-gtm-module';
import React, { Component } from 'react';
import { ListGroup } from 'reactstrap';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import CartItem from './CartItem';
import GTMConstants from '../helpers/GTMConstants'
import PropTypes from 'prop-types';

const GET_CART_PRODUCTS = gql`
  {
    cart {
      cartProductId
      name
      quantity
      price
    }
  }
`;

const sumProductQuantities = (total, product) => {
  return total += product.quantity;
}

const getCartQuantity = cartProducts => {
  const INITIAL_QUANTITY = 0;
  return cartProducts.reduce(sumProductQuantities, INITIAL_QUANTITY);
}

const withCartProducts = Component => props => {
  return (
    <Query query={GET_CART_PRODUCTS}>
      {({ loading, data: { cart: cartProducts = [] } }) => {
        return (
          <Component cartLoading={loading} cartProducts={cartProducts} {...props} />
        );
      }}
    </Query>
  );
};

class Cart extends Component {
  showCartProducts() {
    const { cartProducts, cartLoading } = this.props;

    TagManager.dataLayer({
      dataLayer: {
        [GTMConstants.DATA_LAYER_CART_ITEM_COUNT]: getCartQuantity(cartProducts),
      },
    });
    
    if (!cartLoading && cartProducts && cartProducts.length > 0) {
      return (
        <ListGroup>
          {
            cartProducts.map(cartProduct => {
              const { cartProductId, name, quantity, price } = cartProduct
              return (
                <CartItem 
                  key={cartProductId}
                  name={name}
                  quantity={quantity}
                  price={price}
                />
              );
            })
          }
        </ListGroup>
      );
    } else {
      return (
        <p>
          Cart is empty
        </p>
      );
    }
  }

  render() {
    return (
      <div>
        <h1>
          Cart
        </h1>
        {this.showCartProducts()}
      </div>
    );
  }
}

Cart.propTypes = {
  cartLoading: PropTypes.bool.isRequired,
  cartProducts: PropTypes.array.isRequired,
};

export default withCartProducts(Cart);
export { GET_CART_PRODUCTS };
