import React, { Component } from 'react';
import { ListGroup } from 'reactstrap';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import CartItem from './CartItem';

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

const withCartProducts = Component => props => {
  return (
    <Query query={GET_CART_PRODUCTS}>
      {({ loading, data }) => {
        return (
          <Component cartLoading={loading} cartProducts={data && data.cart} {...props} />
        );
      }}
    </Query>
  );
};

class Cart extends Component {
  showCartProducts() {
    const { cartProducts, cartLoading } = this.props;
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

export default withCartProducts(Cart);
export { GET_CART_PRODUCTS };
