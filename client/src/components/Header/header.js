import React from 'react';
import SvgComponent from "./header-logo"

import CartIcon from "../Cart-icon/cart-icon"

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink
} from "./header-styles"

const Header = () => (
  <HeaderContainer>
    <LogoContainer to='/'>
      <SvgComponent />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink>SHOP</OptionLink>
      <OptionLink>CONTACT</OptionLink>
      <CartIcon />
    </OptionsContainer>
    {/* {hidden ? null : <CartDropdown />} */}
  </HeaderContainer>
)

export default Header