import {CART_ADD_ITEM, CART_REMOVE_ITEM} from "../constants/cartConstants";


/*
A reducer is a function that receives the current state and an action object,
decides how to update the state if necessary,
and returns the new state: (state, action) => newState
 */

export const cartReducer = (state = {cartItems: []}, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.id === item.id)
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.id === existItem.id ? item : x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.id !== action.payload)
            }
        default:
            return state
    }
}