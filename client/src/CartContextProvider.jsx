import React from 'react';
import { useStickyState } from './utils/local-storage';

export const CartContext = React.createContext([{}, () => {}]);

export const CartContextProvider = ({ children }) => {
  const [cartState, setCartState] = useStickyState({ ids: [], data: {} }, 'bonsai-cart');
  return (
    <CartContext.Provider value={[cartState, setCartState]}>
      {children}
    </CartContext.Provider>
  );
};
