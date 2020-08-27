import * as React from "react";
import { Navbar, Nav, NavItem } from "reactstrap";

import Auth from "./Auth";

import "./styles.css";

export function Navigation() {
  return (
    <Navbar className="Nav">
      <Nav className="ml-auto" navbar>
        <NavItem>
          <Auth />
        </NavItem>
      </Nav>
    </Navbar>
  );
}

export default Navigation;
