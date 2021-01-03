import { ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART } from "./types";

export const addToCart = (product) =>{
  return{
    type: ADD_TO_CART,
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