import { ADD_TO_CART, REMOVE_FROM_CART } from "./actionTypes";

export const addToCart = (content) => ({
    type: ADD_TO_CART,
    payload: {
        ...content
    }
});

export const removeFromCart = id => ({
    type: REMOVE_FROM_CART,
    payload: { id }
});

