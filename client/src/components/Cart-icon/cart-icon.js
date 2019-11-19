import React, { useContext } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCartItemsCount } from "../../redux/shopCart/cart-selectors";
import CartContext from "../../contexts/cart/cart-context";

import {
  ShoppingIcon,
  CartContainer,
  ItemCountContainer
} from "./cart-icon-styles";

const CartIcon = ({ itemCount }) => {
  const { toggleHidden } = useContext(CartContext);
  return (
    <CartContainer onClick={toggleHidden}>
      <ShoppingIcon />
      <ItemCountContainer>{itemCount}</ItemCountContainer>
    </CartContainer>
  );
};

export default connect(
  createStructuredSelector({
    itemCount: selectCartItemsCount
  })
)(CartIcon);
