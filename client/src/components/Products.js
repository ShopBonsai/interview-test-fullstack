import React from "react";
import {
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  CardBody,
  Media,
} from "reactstrap";
import { useQuery, gql } from "@apollo/client";
import "./styles.css";

const GET_PRODUCTS = gql`
  query GetProducts {
    merchants {
      guid
      merchant
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
  }
`;

export const ProductsList = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  const showProducts = () => {
    if (!loading && data.merchants && data.merchants.length > 0) {
      return data.merchants.map(({ products }) => {
        return (
          products &&
          products.length > 0 &&
          products.map((product) => {
            const { color, description, image, name, price, size } = product;
            return (
              <Media key={product.id} className="product-card">
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
          })
        );
      });
    } else {
      return (
        <div>
          <h3>No products available</h3>
        </div>
      );
    }
  };

  return <div>{showProducts()}</div>;
};
