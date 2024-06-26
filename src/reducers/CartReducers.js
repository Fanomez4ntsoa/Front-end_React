import * as CartConstant from '../constants/CartConstant'
  
export const cartReducer = (
    state = { cartItems: [], shippingAddress: {} },
    action
) => {
    switch (action.type) {
        case CartConstant.CART_ADD_ITEM:
            const item = action.payload
            console.log('Item added to cart:' , item);
            
            const existItem = state.cartItems.find((x) => x.product === item.product)
    
            if (existItem) {
            return {
                ...state,
                cartItems: state.cartItems.map((x) =>
                x.product === existItem.product ? item : x
                ),
            }
            } else {
            return {
                ...state,
                cartItems: [...state.cartItems, item],
            }
            }
        case CartConstant.CART_REMOVE_ITEM:
            return {
            ...state,
            cartItems: state.cartItems.filter((x) => x.product !== action.payload),
            }
        case CartConstant.CART_SAVE_SHIPPING_ADDRESS:
            return {
            ...state,
            shippingAddress: action.payload,
            }
        case CartConstant.CART_SAVE_PAYMENT_METHOD:
            return {
            ...state,
            paymentMethod: action.payload,
            }
        default:
            return state
    }
}
  