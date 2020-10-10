import React from 'react';
import {
  DropdownMenu, DropdownItem, Dropdown, DropdownToggle,
} from 'reactstrap';

import { CartContext } from '../../CartContextProvider';
import './Cart.css';
import CartItem from './CartItem';

export const Cart = () => {
  const [cartOpen, setCartOpen] = React.useState(false);
  const [cartState, setCartState] = React.useContext(CartContext);
  const toggleCart = () => setCartOpen((prevState) => !prevState);
  const removeFromCart = (itemId) => {
    const prevCartIds = cartState.ids;
    const idPosition = prevCartIds.indexOf(itemId);
    if (idPosition < 0) return;
    const nextCartIds = prevCartIds.filter((id) => id !== itemId);
    setCartState({ ids: nextCartIds });
  };
  const [cartTotal, setCartTotal] = React.useState(0);
  const adjustCartTotal = (itemTotal, operation) => {
    if (operation === 'add') {
      setCartTotal((prevTotal) => prevTotal + itemTotal);
    }
    if (operation === 'subtract') {
      setCartTotal((prevTotal) => prevTotal - itemTotal);
    }
  };
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
        {cartState.ids.map((id) => (
          <CartItem
            key={`cart-${id}`}
            itemId={id}
            adjustCartTotal={adjustCartTotal}
            onRemoveClick={() => removeFromCart(id)}
          />
        ))}
        <DropdownItem disabled>
          {`Cart Total: $ ${cartTotal.toFixed(2)}`}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
