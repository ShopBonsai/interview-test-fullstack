import { SET_CURRENT_USER } from "../actionTypes";
const initialState = {
    userId: 'df7aa083-7b59-45fd-a036-31efa59212c7'
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
        default:
            return state;
    }
}
