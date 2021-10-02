import { gql } from 'apollo-boost';
import React, { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router';
import { CardTitle, CardSubtitle, CardText, Button, CardBody, Media } from 'reactstrap';

import { CartContext } from '../../contexts/CartContext';
import Loader from '../loader/loader.component';
import { showSuccessMessage, showErrorMessage } from '../../utils/helper';

import './checkout.css';

const CREATE_ORDER = gql`
  mutation createOrder($order: OrderInput!) {
    createOrder(order: $order) {
      products {
        id
        name
        price
        image
        quantity
      }
    }
  }
`;

const Checkout = () => {
  const history = useHistory();
  const { toggleCart, items, setCartItems } = useContext(CartContext);

  const [createOrder, { loading: createLoading }] = useMutation(CREATE_ORDER, {
    onCompleted: ({}) => {
      setCartItems([]);
      history.push('/orders');
      showSuccessMessage('Order created', 'Now you just wait for your products!');
    },
    onError: ({}) => {
      showErrorMessage('Cannot create a order', 'You need to login first');
    },
  });

  if (createLoading) return <Loader />;

  const sendOrder = () => {
    const products = items.map(({ id, name, price, image, quantity }) => ({ id, name, price, image, quantity }));

    createOrder({ variables: { order: { products: products } } });
  };

  return (
    <div>
      {items && items.length > 0 ? (
        <div className="checkout">
          <div className="checkout-items">
            {items.map((item) => (
              <Media key={item.id} className="checkout-item">
                <Media left>
                  <Media object src={item.image} alt="Product image cap" className="checkout-image" />
                </Media>
                <CardBody key={item.id}>
                  <CardTitle style={{ fontWeight: 600 }}>{item.name}</CardTitle>
                  <CardTitle>Price: {item.price}</CardTitle>
                  <CardText>Quantity: {item.quantity}</CardText>
                </CardBody>
              </Media>
            ))}
          </div>
          <Button
            className="checkout-buy"
            onClick={() => {
              sendOrder();
            }}
          >
            BUY ${items.reduce((a, b) => a + b.price * b.quantity, 0).toFixed(2)}
          </Button>
        </div>
      ) : (
        'Your cart is empty'
      )}
    </div>
  );
};

export default Checkout;
