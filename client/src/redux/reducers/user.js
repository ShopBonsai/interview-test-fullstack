import { SET_CURRENT_USER, SET_USER_LIKED_PRODUCT } from "../actionTypes";
const initialState = {
    userId: 'df7aa083-7b59-45fd-a036-31efa59212c7',
    likes: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER: {
            const { user } = action.payload;
            return {
                ...state,
                ...user
            }
        }
        case SET_USER_LIKED_PRODUCT: {
            const { product } = action.payload
            return {
                ...state,
                likes: [ ...state.likes, product]
            }
        }
        default:
            return state;
    }
}
