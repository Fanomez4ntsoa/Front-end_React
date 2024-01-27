import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'
import * as productReducers from './reducers/ProductReducers'
import { cartReducer } from './reducers/CartReducers'
import * as userReducers from './reducers/UserReducers'
import * as orderReducers from './reducers/OrderReducers'

const reducer = combineReducers({
  productList: productReducers.productListReducer,
  productDetails: productReducers.productDetailsReducer,
  productDelete: productReducers.productDeleteReducer,
  productCreate: productReducers.productCreateReducer,
  productUpdate: productReducers.productUpdateReducer,
  productReviewCreate: productReducers.productReviewCreateReducer,
  productTopRated: productReducers.productTopRatedReducer,
  cart: cartReducer,
  userLogin: userReducers.userLoginReducer,
  userRegister: userReducers.userRegisterReducer,
  userDetails: userReducers.userDetailsReducer,
  userUpdateProfile: userReducers.userUpdateProfileReducer,
  userList: userReducers.userListReducer,
  userDelete: userReducers.userDeleteReducer,
  userUpdate: userReducers.userUpdateReducer,
  orderCreate: orderReducers.orderCreateReducer,
  orderDetails: orderReducers.orderDetailsReducer,
  orderPay: orderReducers.orderPayReducer,
  orderDeliver: orderReducers.orderDeliverReducer,
  orderListMy: orderReducers.orderListMyReducer,
  orderList: orderReducers.orderListReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};

const initialState = {
    cart: {
      cartItems: cartItemsFromStorage,
      shippingAddress: shippingAddressFromStorage,
    },
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;
