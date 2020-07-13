import * as actionTypes from './ActionsType'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const checkExpTime = (expTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        }, expTime * 1000)
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/api/account/signin/', {
            username: username,
            password: password
        })
            .then(res => {
                
                if (res.data.err === 'true') {
                    // console.log(res.data.message);
                    // alert(res.data.message)
                    dispatch(authFail(res.data.message))
                } else {
                    const token = res.data.data
                    const expTime = new Date(new Date().getTime() + 3600 * 1000)
                    localStorage.setItem('token', token)
                    localStorage.setItem('expDate', expTime)
                    dispatch(authSuccess(token))
                    dispatch(checkExpTime(3600))
                    // alert(res.data.message)
                }


            })
            .catch(error => {
                dispatch(authFail(error.message))
            })
    }
}

export const authSignup = (first_name, last_name, email, username, password, phone) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/api/account/signup/', {
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone: phone,
            username: username,
            password: password
        })
            .then(res => {
                const token = res.data.data
                const expTime = new Date(new Date().getTime() + 3600 * 1000)
                localStorage.setItem('token', token)
                localStorage.setItem('expDate', expTime)
                dispatch(authSuccess(token))
                dispatch(checkExpTime(3600))
            })
            .catch(err => {
                dispatch(authFail(err))
            })
    }
}

export const authLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expDate')

    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined) {
            dispatch(authLogout());
        } else {
            const expTime = new Date(localStorage.getItem('expTime'));
            if (expTime <= new Date()) {
                dispatch(authLogout());
            } else {
                dispatch(authSuccess(token));
                dispatch(checkExpTime((expTime.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}