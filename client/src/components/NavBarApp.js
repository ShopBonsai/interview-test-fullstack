import React, { Component } from 'react'
import { Navbar, NavbarBrand } from 'reactstrap';

class NavBarApp extends Component {
    render() {
        return(
            <div className='bar'>
                <Navbar color='faded' light>
                    <NavbarBrand href="/" className="mr-auto">BonsaiShop</NavbarBrand>
                </Navbar>
            </div>
        )
    }
}
export default NavBarApp;
