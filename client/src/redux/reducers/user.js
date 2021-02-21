import { SET_CURRENT_USER, SET_USER_LIKED_PRODUCT } from "../actionTypes";
const initialState = {
    data: {
        userId: 'df7aa083-7b59-45fd-a036-31efa59212c7'
    }
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER: {
            const { user } = action.payload;
            return {
                ...state,
                data: {
                    ...state.user,
                    ...user
                }
            }
        }
        case SET_USER_LIKED_PRODUCT: {
            const { product } = action.payload
            const userb = state.data.likes
            userb.push(product.id)
            return {
                data: {
                    ...state.data,
                }
            }
        }
        default:
            return state;
    }
}
