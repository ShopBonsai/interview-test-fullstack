import React, { Component } from "react";
import { connect } from "react-redux";
import { CardTitle, CardSubtitle, CardText, CardBody, Media } from "reactstrap";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

import { onAddedItem } from "../../redux/shopCart/cart-actions";

import { ProductCard, AddButton } from "./products-styles.js";

const GET_PRODUCTS = gql`
  {
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
        quantity
      }
    }
  }
`;

const withProducts = Component => props => {
  return (
    <Query query={GET_PRODUCTS}>
      {({ loading, data }) => {
        return (
          <Component
            merchantsLoading={loading}
            merchants={data && data.merchants}
            {...props}
          />
        );
      }}
    </Query>
  );
};

const ProductsList = ({ merchants, merchantsLoading, onAddedItem }) => {
  if (!merchantsLoading && merchants && merchants.length > 0) {
    return merchants.map(({ products }) => {
      return (
        products &&
        products.length > 0 &&
        products.map(product => {
          const { color, description, image, name, price, size } = product;
          return (
            <ProductCard key={product.id}>
              <Media left href="#">
                <Media object src={image} alt="Product image cap" />
              </Media>
              <CardBody>
                <CardTitle style={{ fontWeight: 600 }}>{name}</CardTitle>
                <CardTitle>Price: {price}</CardTitle>
                <CardSubtitle>Color: {color}</CardSubtitle>
                <CardSubtitle>Size: {size}</CardSubtitle>
                <CardText>Details: {description}</CardText>
                <AddButton onClick={()=>onAddedItem(product)}> Add to cart </AddButton>
              </CardBody>
            </ProductCard>
          );
        })
      );
    });
  } else {
    return <h3>No products available</h3>;
  }
};


export default connect(null, {onAddedItem})(withProducts(ProductsList));