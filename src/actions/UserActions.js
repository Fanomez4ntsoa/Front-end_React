import axios from 'axios';
import * as userConstants from '../constants/UserConstant';
import { ORDER_LIST_MY_RESET } from '../constants/OrderConstant';

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: userConstants.USER_LOGIN_REQUEST,
        })
        const config = {
            headers: {
                'Content-type': 'application/json',
            },
        }

        const { data } = await axios.post(
            'http://localhost:4000/api/users/login',
            { email, password },
            config
        )

        dispatch({
            type: userConstants.USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: userConstants.USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: userConstants.USER_LOGOUT })
    dispatch({ type: userConstants.USER_DETAILS_RESET })
    dispatch({ type: ORDER_LIST_MY_RESET })
    dispatch({ type: userConstants.USER_LIST_RESET })
}
  
export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
        type: userConstants.USER_REGISTER_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.post(
            'http://localhost:4000/api/users',
            { name, email, password },
            config
        )

        dispatch({
            type: userConstants.USER_REGISTER_SUCCESS,
            payload: data,
        })

        dispatch({
            type: userConstants.USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: userConstants.USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}
  
export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: userConstants.USER_DETAILS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`http://localhost:4000/api/users/${id}`, config)

        dispatch({
            type: userConstants.USER_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: userConstants.USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}
  
export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: userConstants.USER_UPDATE_PROFILE_REQUEST,
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

        const { data } = await axios.put(`http://localhost:4000/api/users/profile`, user, config)

        dispatch({
            type: userConstants.USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        })
        } catch (error) {
        dispatch({
            type: userConstants.USER_UPDATE_PROFILE_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}
  
export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: userConstants.USER_LIST_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`http://localhost:4000/api/users`, config)

        dispatch({
            type: userConstants.USER_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: userConstants.USER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}
  
export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: userConstants.USER_DELETE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.delete(`http://localhost:4000/api/users/${id}`, config)

        dispatch({ type: userConstants.USER_DELETE_SUCCESS })
    } catch (error) {
        dispatch({
            type: userConstants.USER_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}
  
export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: userConstants.USER_UPDATE_REQUEST,
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

        const { data } = await axios.put(`http://localhost:4000/api/users/${user._id}`, user, config)

        dispatch({ type: userConstants.USER_UPDATE_SUCCESS })

        dispatch({ type: userConstants.USER_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: userConstants.USER_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}