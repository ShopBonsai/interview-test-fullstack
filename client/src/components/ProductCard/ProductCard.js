import {
  Button,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Media,
} from "reactstrap";
import PropTypes from "prop-types";
import React from "react";

export const ProductCard = ({
  product: { color, description, id, image, name, price, size },
}) => {
  return (
    <Media key={id} className="product-card">
      <Media left href="#">
        <Media object alt="Product image cap" src={image} />
      </Media>
      <CardBody>
        <CardTitle style={{ fontWeight: 600 }}>{name}</CardTitle>
        <CardTitle>Price: {price}</CardTitle>
        <CardSubtitle>Color: {color}</CardSubtitle>
        <CardSubtitle>Size: {size}</CardSubtitle>
        <CardText>Details: {description}</CardText>
        <Button block color="primary" size="lg">
          Buy
        </Button>
      </CardBody>
    </Media>
  );
};
ProductCard.propTypes = {
  product: PropTypes.object,
};
