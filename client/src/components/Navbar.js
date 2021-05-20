import React from 'react';
import { Navbar, Button, NavbarBrand } from 'reactstrap';

const Nav = () => {
	return (
		<Navbar color='light' sticky='top'>
			<NavbarBrand href='/'>
				Bonsai
			</NavbarBrand>
			<Button>Cart</Button>
		</Navbar>
	);
};

export default Nav;
