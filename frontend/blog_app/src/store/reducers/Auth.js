import * as actionTypes from '../actions/ActionsType'
import { updateObjects } from '../utility'

const iniState = {
    token: null,
    error: null,
    loading: false,
    searchData : null
}

const authStart = (state, action)=>{
    return updateObjects(state, {
        error: null,
        loading: true
    })
}

const authSuccess = (state, action) =>{
    return updateObjects(state, {
        error: null,
        loading: false,
        token: action.token
    })
}

const authFail = (state, action) =>{
    return updateObjects(state,{
        error: action.error,
        loading: false
    })
}

const authLogout = (state, action)=>{
    return updateObjects(state, {
        token: null
    })
}


const searchStart = (state, action)=>{
    return updateObjects(state, {
        error: null,
        loading: true
    })
}

const searchSuccess = (state, action) =>{
    return updateObjects(state, {
        error: null,
        loading: false,
        token: action.data
    })
}


const searchFail = (state, action) =>{
    return updateObjects(state,{
        error: action.error,
        loading: false
    })
}

const reduser = (state=iniState, action)=>{
    switch(action.type){
        case actionTypes.AUTH_START : return authStart(state, action);
        case actionTypes.AUTH_SUCCESS : return authSuccess(state, action);
        case actionTypes.AUTH_LOGOUT : return authLogout(state, action);
        case actionTypes.AUTH_FAIL : return authFail(state, action);

        case actionTypes.SEARCH_FAIL : return searchFail(state, action);
        case actionTypes.SEARCH_START : return searchStart(state, action);
        case actionTypes.SEARCH_SUCCESS : return searchSuccess(state, action);
        default:
            return state
    }
}

export default reduser