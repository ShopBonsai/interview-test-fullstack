import "./styles.css";
import {
  Button,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Media,
} from "reactstrap";
import React, { Component } from "react";
import { EmptyNotice } from "../EmptyNotice";
import { Loading } from "../Loading";
import PropTypes from "prop-types";
import { withProducts } from "../../containers";

class ProductsList extends Component {
  render() {
    return <div>{this._showProducts()}</div>;
  }
  _showProducts() {
    const { areMerchantsLoading, merchants } = this.props;

    // Always return edge cases as early as possible, this eliminates
    // deeply nested code and aids in readability of code
    if (areMerchantsLoading || !merchants) return <Loading />;
    if (!merchants.length) return <EmptyNotice />;

    return merchants.map(({ products }) => {
      return (
        products &&
        products.length > 0 &&
        products.map((product) => {
          const { color, description, image, name, price, size } = product;
          return (
            <Media key={product.id} className="product-card">
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
        })
      );
    });
  }
}

ProductsList.propTypes = {
  areMerchantsLoading: PropTypes.bool,
  merchants: PropTypes.arrayOf(PropTypes.object),
};

export const Products = withProducts(ProductsList);
