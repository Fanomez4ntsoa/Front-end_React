import axios from 'axios';
import * as productConstants from '../constants/ProductConstant';

export const listProducts = (keyword = '', pageNumber = '') => async ( dispatch ) => {
    try {
        dispatch({ type: productConstants.PRODUCT_LIST_REQUEST })

        const { data } = await axios.get(
            `http://localhost:4000/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
        )

        dispatch({
            type: productConstants.PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: productConstants.PRODUCT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: productConstants.PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`http://localhost:4000/api/products/${id}`)
        
        dispatch({
            type: productConstants.PRODUCT_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: productConstants.PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: productConstants.PRODUCT_DELETE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.delete(`http://localhost:4000/api/products/${id}`, config)

        dispatch({
            type: productConstants.PRODUCT_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: productConstants.PRODUCT_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: productConstants.PRODUCT_CREATE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post(`http://localhost:4000/api/products`, {}, config)

        dispatch({
            type: productConstants.PRODUCT_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: productConstants.PRODUCT_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: productConstants.PRODUCT_UPDATE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.put(
            `http://localhost:4000/api/products/${product._id}`,
            product,
            config
        )

        dispatch({
        type: productConstants.PRODUCT_UPDATE_SUCCESS,
        payload: data,
        })
    } catch (error) {
        dispatch({
            type: productConstants.PRODUCT_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: productConstants.PRODUCT_CREATE_REVIEW_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.post(`http://localhost:4000/api/products/${productId}/reviews`, review, config)

        dispatch({
            type: productConstants.PRODUCT_CREATE_REVIEW_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: productConstants.PRODUCT_CREATE_REVIEW_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const listTopProducts = () => async (dispatch) => {
    try {
        dispatch({ type: productConstants.PRODUCT_TOP_REQUEST })

        const { data } = await axios.get(`http://localhost:4000/api/products/top`)

        dispatch({
            type: productConstants.PRODUCT_TOP_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: productConstants.PRODUCT_TOP_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}