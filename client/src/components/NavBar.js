import React, {useState} from 'react';
import { useSelector } from "react-redux";
import {
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

export default function NavigationBar(props) {
  const cartItems = useSelector(state => state.cart.items);

  return (
    <Navbar color="dark" light expand="md">
      <Collapse isOpen={false} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">Home </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/cart">Cart ({Object.keys(cartItems).length || 0})</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
    </Navbar>
  )
}
