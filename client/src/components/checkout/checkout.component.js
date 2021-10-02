import { gql } from 'apollo-boost';
import React, { useContext } from 'react';
import { useMutation } from '@apollo/client';

import './checkout.css';
import { CartContext } from '../../CartContext';
import { useHistory } from 'react-router';
import { CardTitle, CardSubtitle, CardText, Button, CardBody, Media } from 'reactstrap';

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

  const [createOrder, {}] = useMutation(CREATE_ORDER, {
    onCompleted: ({}) => {
      setCartItems([]);
      history.push('/orders');
    },
  });

  const sendOrder = () => {
    const products = items.map(({ id, name, price, image, quantity }) => ({ id, name, price, image, quantity }));

    createOrder({ variables: { order: { products: products } } });
  };

  return (
    <div className="checkout">
      <div className="checkout-items">
        {items &&
          items.length > 0 &&
          items.map((item) => (
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
  );
};

export default Checkout;
