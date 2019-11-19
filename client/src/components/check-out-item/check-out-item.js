import React from "react";
import { connect } from "react-redux";

import {
  onDecrementedItemQuantity,
  onIncrementedItemQuantity,
  onRemovedItem
} from "../../redux/shopCart/cart-actions";

import {
  CheckoutItemContainer,
  ImageContainer,
  TextContainer,
  QuantityContainer,
  RemoveButtonContainer
} from "./check-out-item-styles";

const CheckoutItem = ({
  cartItem,
  onRemovedItem,
  onIncrementedItemQuantity,
  onDecrementedItemQuantity
}) => {
  const { name, image, price, quantity } = cartItem;
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={image} alt="item" />
      </ImageContainer>
      <TextContainer>{name}</TextContainer>
      <QuantityContainer>
        <div onClick={() => onDecrementedItemQuantity(cartItem)}>&#10094;</div>
        <span>{quantity}</span>
        <div onClick={() => onIncrementedItemQuantity(cartItem)}>&#10095;</div>
      </QuantityContainer>
      <TextContainer>{price}</TextContainer>
      <RemoveButtonContainer onClick={() => onRemovedItem(cartItem)}>
        &#10005;
      </RemoveButtonContainer>
    </CheckoutItemContainer>
  );
};

export default connect(null, {
  onDecrementedItemQuantity,
  onIncrementedItemQuantity,
  onRemovedItem
})(CheckoutItem);
