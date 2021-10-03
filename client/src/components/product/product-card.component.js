import React, { useContext, useState } from 'react';
import { CardTitle, CardSubtitle, CardText, Button, Row, Col, CardBody, Media, Container } from 'reactstrap';
import { AppContext } from '../../contexts/AppContext';

import './product-card.css';

export const ProductCard = (props) => {
  const { toggleCart } = useContext(AppContext);
  const { id, color, description, image, name, price, size } = props.product || {};

  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <Media key={id} className="product-card">
      <Media left>
        <Media object src={image} alt="Product image cap" />
      </Media>
      <CardBody>
        <CardTitle style={{ fontWeight: 600 }}>{name}</CardTitle>
        <CardTitle>Price: {price}</CardTitle>
        <CardSubtitle>Color: {color}</CardSubtitle>
        <CardSubtitle>Size: {size}</CardSubtitle>
        <CardText>Details: {description}</CardText>
        <Row
          style={{
            padding: '10px',
            width: '100%',
            border: '2px solid rgba(136, 10, 142, 0.3)',
            margin: '20px 0',
            textAlign: 'center',
            backgroundColor: 'white',
          }}
        >
          <Col style={{ cursor: 'pointer' }} onClick={decreaseQuantity}>
            -
          </Col>
          <Col>{quantity}</Col>
          <Col style={{ cursor: 'pointer' }} onClick={increaseQuantity}>
            +
          </Col>
        </Row>
        <Button
          color="primary"
          size="lg"
          block
          onClick={() => {
            toggleCart({ ...props.product, quantity });
            setQuantity(1);
          }}
        >
          Add to Cart
        </Button>
      </CardBody>
    </Media>
  );
};
