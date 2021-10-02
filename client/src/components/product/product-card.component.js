import React, { useContext } from 'react';
import { CardTitle, CardSubtitle, CardText, Button, CardBody, Media } from 'reactstrap';
import { CartContext } from '../../CartContext';

import './product-card.css';

export const ProductCard = (props) => {
  const { toggleCart } = useContext(CartContext);

  const { id, color, description, image, name, price, size } = props.product || {};

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
        <Button color="primary" size="lg" block onClick={() => toggleCart(props.product)}>
          Add to Cart
        </Button>
      </CardBody>
    </Media>
  );
};
