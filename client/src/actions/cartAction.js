import { ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART, INCREASE_QTY, DECREASE_QTY } from "./types";

export const addToCart = (product) =>{
  return{
    type: ADD_TO_CART,
    payload: product
  };
};

export const increasetItemQty = (product) =>{
  return{
    type: INCREASE_QTY,
    payload: product
  };
};

export const decreaseItemQty = (product) =>{
  return{
    type: DECREASE_QTY,
    payload: product
  };
};

export const removeFromCart = (product) =>{
  return {
    type: REMOVE_FROM_CART,
    payload: product
  }
};

export const emptyCart = () =>{
  return{
    type: EMPTY_CART
  };
};