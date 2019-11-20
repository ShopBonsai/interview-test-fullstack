import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectCartItems,
  selectCartTotal
} from "../../redux/shopCart/cart-selectors";

import CheckoutItem from "../../components/check-out-item/check-out-item";
import StripeCheckoutButton from "../../components/Stripe-button/stripe-button"


import {
  CheckoutPageContainer,
  CheckoutHeaderContainer,
  HeaderBlockContainer,
  TotalContainer,
  EmptyCartHeader,
  SpanContainer,
  WarningContainer
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
    <WarningContainer>
      *Please use the following test credit card for payments*
      <br />
      4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
    </WarningContainer>
    <StripeCheckoutButton price={total} />
  </CheckoutPageContainer>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);
