import React, { useState, createContext } from 'react';

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);

    if (exist) {
      setCartItems(cartItems.map((x) => (x.id === product.id ? { ...exist, quantity: exist.quantity + 1 } : x)));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  return <CartContext.Provider value={{ items: cartItems, toggleCart: addToCart, setCartItems }}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
