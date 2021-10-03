import { gql } from 'apollo-boost';
import React, { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router';
import { CardTitle, CardText, Button, CardBody, Media } from 'reactstrap';

import { AppContext } from '../contexts/AppContext';
import Loader from '../components/loader/loader.component';
import { showSuccessMessage, showErrorMessage } from '../utils/helper';
import { CREATE_ORDER } from '../qgl/order';

import './checkout.css';
import EmptyView from '../components/empty-view.component';

const Checkout = () => {
  const history = useHistory();
  const { items, setCartItems } = useContext(AppContext);

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
            color="primary"
            size="lg"
            className="checkout-buy"
            onClick={() => {
              sendOrder();
            }}
          >
            BUY ${items.reduce((a, b) => a + b.price * b.quantity, 0).toFixed(2)}
          </Button>
        </div>
      ) : (
        <EmptyView message={'Your cart is empty'} />
      )}
    </div>
  );
};

export default Checkout;
