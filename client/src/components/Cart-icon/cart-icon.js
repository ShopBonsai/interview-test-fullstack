import React from "react";

import {
  ShoppingIcon,
  CartContainer,
  // ItemCountContainer
} from "./cart-icon-styles";

const CartIcon = () => (
  <CartContainer>
    <ShoppingIcon />
   {/* <ItemCountContainer></ItemCountContainer> */}
  </CartContainer>
);

export default CartIcon;
