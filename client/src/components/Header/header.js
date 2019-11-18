import React from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SvgComponent from "./header-logo";

import CartIcon from "../Cart-icon/cart-icon";
import CartDropdown from "../Cart-dropdown/cart-dropdown"
import { selectCartHidden } from '../../redux/shopCart/cart-selectors';

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink
} from "./header-styles";

const Header = ({hidden}) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <SvgComponent />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to="/products">PRODUCTS</OptionLink>
      <OptionLink to="/contact">CONTACT</OptionLink>
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
  hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);
