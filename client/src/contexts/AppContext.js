import React, { useState, createContext } from 'react';

import { AUTH_TOKEN } from '../utils/consts';
import { showInfoMessage } from '../utils/helper';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

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

  const isLoggedIn = () => {
    const authToken = localStorage.getItem(AUTH_TOKEN);

    return loggedIn && authToken ? true : false;
  };

  const login = (token) => {
    localStorage.setItem(AUTH_TOKEN, token);
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    setLoggedIn(false);
  };

  return (
    <AppContext.Provider value={{ items: cartItems, toggleCart: addToCart, setCartItems, isLoggedIn, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
