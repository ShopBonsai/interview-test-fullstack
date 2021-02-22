import React, { Component } from "react";
import {
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  CardBody,
  Media
} from "reactstrap";
import { useQuery, gql } from "@apollo/client";

import "./styles.css";

const GET_PRODUCTS = gql`
  {
    products {
      id
      name
      price
      description
      color
      size
      image
    }
  }
`;

const Product = ({ image, name, price, color, size, description }) => {
  return (
    <Media className="product-card">
      <Media left href="#">
        <Media object src={image} alt="Product image cap" />
      </Media>
      <CardBody>
        <CardTitle style={{ fontWeight: 600 }}>{name}</CardTitle>
        <CardTitle>Price: {price}</CardTitle>
        <CardSubtitle>Color: {color}</CardSubtitle>
        <CardSubtitle>Size: {size}</CardSubtitle>
        <CardText>Details: {description}</CardText>
        <Button color="primary" size="lg" block>
          Buy
        </Button>
      </CardBody>
    </Media>
  );
};

const Products = () => {
  const { loading, error, data: { products = [] } = {} } = useQuery(
    GET_PRODUCTS
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something bad happened...</p>;
  return (
    <div>
      {products.map(product => (
        <Product {...product} key={product.id} />
      ))}
    </div>
  );
};

export default Products;
