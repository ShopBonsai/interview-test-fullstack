import React from "react"

import {
  CartItemContainer,
  ItemDetailsContainer,
  CartItemImage
} from "./cart-item-styles"

const CartItem = ({ product: { image, price, name, quantity } }) => (
  <CartItemContainer>
    <CartItemImage src={image} alt='item' />
    <ItemDetailsContainer>
      <span>{name}</span>
      <span>
        {quantity} x ${price}
      </span>
    </ItemDetailsContainer>
  </CartItemContainer>
);

export default CartItem;