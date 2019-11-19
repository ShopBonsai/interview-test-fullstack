import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import SvgComponent from "./header-logo";

import CartIcon from "../Cart-icon/cart-icon";
import CartDropdown from "../Cart-dropdown/cart-dropdown";
import CartContext from "../../contexts/cart/cart-context";
import { selectCartHidden } from "../../redux/shopCart/cart-selectors";

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink
} from "./header-styles";

/*store the hidden value in the header component, because cart icon is child of 
this component, therefore state changes need to be in parent. The display and hide
of the CartIcon currents in this (Header) component level*/

const Header = () => {
  const [hidden, setHidden] = useState(true);
  const toggleHidden = () => setHidden(!hidden);
  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <SvgComponent />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to="/products">PRODUCTS</OptionLink>
        <OptionLink to="/contact">CONTACT</OptionLink>
        <CartContext.Provider value={{ hidden, toggleHidden }}>
          <CartIcon />
        </CartContext.Provider>
      </OptionsContainer>
      {hidden ? null : <CartDropdown />}
    </HeaderContainer>
  );
};

export default connect(createStructuredSelector({
  hidden: selectCartHidden
}))(Header);
