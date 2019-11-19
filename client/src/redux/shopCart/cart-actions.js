import CartActionTypes from './cart-types';

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const onAddedItem = item => ({
  type: CartActionTypes.ADDED_ITEM,
  payload: item
});

export const onRemovedItem = item => ({
  type: CartActionTypes.REMOVED_ITEM,
  payload: item
});

export const onIncrementedItemQuantity = item => ({
  type: CartActionTypes.INCREMENTED_ITEM_QUANTITY,
  payload: item
});

export const onDecrementedItemQuantity = item => ({
  type: CartActionTypes.DECREMENTED_ITEM_QUANTITY,
  payload: item
});

export const clearCart = () => ({
  type: CartActionTypes.CLEAR_CART
});