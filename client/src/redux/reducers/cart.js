import { ADD_TO_CART, REMOVE_FROM_CART } from "../actionTypes";

const initialState = {
    byIds: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART: {
            const { product, quantity } = action.payload;
            const { id } = product
            const prevQuantity = state.byIds[id] ? state.byIds[id].newQuantity : 0
            const newQuantity = Number(prevQuantity + quantity)
            return {
                ...state,
                byIds: {
                    ...state.byIds,
                    [id]: {
                        product,
                        newQuantity
                    }
                }
            };
        }
        case REMOVE_FROM_CART: {
            const { id } = action.payload;
            return {
                ...state,
                byIds: {
                    ...state.byIds,
                    [id]: {
                        ...state.byIds[id]

                    }
                }
            };
        }
        default:
            return state;
    }
}
