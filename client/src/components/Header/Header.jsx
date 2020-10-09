import React from 'react';
import {
  Navbar, NavbarBrand,
} from 'reactstrap';
import { Cart } from './Cart';

export const Header = () => (
  <div>
    <Navbar color="light" light fixed="top">
      <NavbarBrand href="/">Bonsai</NavbarBrand>
      <Cart />
    </Navbar>
  </div>
);
