import React, { useState, createContext } from 'react';
import { showInfoMessage } from '../utils/helper';

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);

    if (exist) {
      setCartItems(cartItems.map((x) => (x.id === product.id ? { ...exist, quantity: exist.quantity + product.quantity } : x)));
    } else {
      if (product.quantity == 0) {
        return;
      }

      setCartItems([...cartItems, product]);
    }

    showInfoMessage('Product added', 'Product included to your cart');
  };

  return <CartContext.Provider value={{ items: cartItems, toggleCart: addToCart, setCartItems }}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
