import { ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART } from "../actions/types";

const initialState = {
  items: []
};

const updateCart = (items, newItem) =>{
  const ismatch = items.find((product) => product._id === newItem._id);
  if(ismatch){
    return items.map((product) =>{
      return product._id === newItem._id ? {
        ...product, qty: product.qty + 1
      } : product
    });
  };

  return [...items, {...newItem, qty: 1}]
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_CART:
      return{
        ...state,
        items: updateCart(state.items, payload)
      };
    case REMOVE_FROM_CART:
      return{
        ...state,
        items: state.items.filter((product) => product._id !== payload._id)
      };
    case EMPTY_CART:
      return {
        ...state,
        items: []
      }
    default:
      return state;
  };
};