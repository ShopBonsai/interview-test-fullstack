import React from 'react';
import {
  DropdownMenu, DropdownItem, Dropdown, DropdownToggle, Media,
} from 'reactstrap';
import { CartContext } from '../../CartContextProvider';
import './Cart.css';

export const Cart = () => {
  const [cartOpen, setCartOpen] = React.useState(false);
  const [cartState, setCartState] = React.useContext(CartContext);
  const toggleCart = () => setCartOpen((prevState) => !prevState);
  let cartTotal = 0;
  return (
    <Dropdown isOpen={cartOpen} toggle={toggleCart} inNavbar>
      <DropdownToggle caret nav>
        <span role="img" aria-label="shopping cart">🛒</span>
        {` (${cartState.ids.length})`}
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem header>
          Shopping Cart
        </DropdownItem>
        <DropdownItem divider />
        {cartState.ids.map((id) => {
          if (!cartState.data[id]) return null;
          const {
            image, name, price,
          } = cartState.data[id];
          cartTotal += price;
          return (
            <>
              <DropdownItem key={`cart-${id}`}>
                <Media>
                  <Media left>
                    <Media className="cart-image" object src={image} alt="product image" />
                  </Media>
                  <Media body>
                    <Media heading>
                      {name}
                    </Media>
                    {`$${price.toFixed(2)}`}
                  </Media>
                </Media>
              </DropdownItem>
              <DropdownItem divider />
            </>
          );
        })}
        <DropdownItem>
          {`Cart Total: $ ${cartTotal.toFixed(2)}`}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
