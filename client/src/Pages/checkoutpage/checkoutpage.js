import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CheckoutItem from "../../components/check-out-item/check-out-item";

import {
  selectCartItems,
  selectCartTotal
} from "../../redux/shopCart/cart-selectors";

import {
  CheckoutPageContainer,
  CheckoutHeaderContainer,
  HeaderBlockContainer,
  TotalContainer,
  EmptyCartHeader,
  SpanContainer,
} from "./checkoutpage-styles";

const CheckoutPage = ({ cartItems, total }) => (
  <CheckoutPageContainer>
    <CheckoutHeaderContainer>
      <HeaderBlockContainer>
        <SpanContainer>Product</SpanContainer>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <SpanContainer>Description</SpanContainer>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <SpanContainer>Quantity</SpanContainer>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <SpanContainer>Price</SpanContainer>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <SpanContainer>Remove</SpanContainer>
      </HeaderBlockContainer>
    </CheckoutHeaderContainer>
    {cartItems.map(cartItem => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    {cartItems.length === 0 && <EmptyCartHeader>NO ITEMS</EmptyCartHeader>}
    <TotalContainer>TOTAL: ${total}</TotalContainer>
  </CheckoutPageContainer>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);
