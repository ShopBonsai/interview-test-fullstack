import React from "react";
import { connect } from "react-redux";
import { gql } from "apollo-boost";
import { Query, Mutation } from "react-apollo";

import { onAddedItem } from "../../redux/shopCart/cart-actions";

import {
  ProductContainer,
  ProductCard,
  MediaImage,
  ProductFooterContainer,
  ProductInfoContainer,
  AddButton,
  LoadingProduct
} from "./products-styles.js";

const LIKE_PRODUCT = gql`
  mutation LikeProduct($userId: String!, $productId: String!) {
    likeProduct(userId: $userId, productId: $productId) {
      userId
    }
  }
`;

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

const withLike = Component => props => {
  return (
    <Mutation mutation={LIKE_PRODUCT}>
      {like => (
        <Component
          onLike={(userId, productId) =>
            like({ variables: { userId, productId } })
          }
          {...props}
        />
      )}
    </Mutation>
  );
};

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

const ProductsList = ({ merchants, merchantsLoading, onAddedItem, onLike }) => {
  if (!merchantsLoading && merchants && merchants.length > 0) {
    return merchants.map(({ products }) => {
      return (
        products &&
        products.length > 0 &&
        products.map(product => {
          const { color, description, image, name, price, size } = product;
          return (
            <ProductContainer>
              <ProductCard key={product.id}>
                <MediaImage image={image} alt="Product image cap" />
                <ProductFooterContainer>
                  <ProductInfoContainer>{name}</ProductInfoContainer>
                  <ProductInfoContainer>Price: {price}</ProductInfoContainer>
                  <ProductInfoContainer>Color: {color}</ProductInfoContainer>
                  <ProductInfoContainer>Size: {size}</ProductInfoContainer>
                  <ProductInfoContainer>
                    Details: {description}
                  </ProductInfoContainer>
                  <AddButton onClick={() => onAddedItem(product)}>
                    Add to cart
                  </AddButton>
                  <AddButton
                    onClick={() => onLike("143aklsfj2jfsf", product.id)}
                  >
                    ❤️
                  </AddButton>
                </ProductFooterContainer>
              </ProductCard>
            </ProductContainer>
          );
        })
      );
    });
  } else {
    return <LoadingProduct>Product Loading</LoadingProduct>;
  }
};

export default connect(null, { onAddedItem })(
  withProducts(withLike(ProductsList))
);
