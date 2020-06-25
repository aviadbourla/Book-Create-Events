import * as actionTypes from "../Redux/actionTypes";

const initalState = {
    connected: false,
    token:'',
    id: ''
};

const login = (state, action) => {
    return {
        ...state,
        connected: true
    }
};

const logout = (state, action) => {
    return {
        ...state,
        connected: false
    }
}

const getToken = (state, action) => {
    const newToken = action.token
    return {
        ...state,
        token: newToken
    }
}

const getUserFullName = (state, action) => {
    const  newFullName = action.fullName
    return {
        ...state,
        fullName: newFullName
    }
}

const getUserId = (state, action) => {
    const newuserId = action.id
    return {
        ...state,
        id: newuserId
    }
}

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.LOG_IN: return login(state, action);
        case actionTypes.LOG_OUT: return logout(state, action);
        case actionTypes.TOKEN: return getToken(state, action);
        case actionTypes.USER_ID: return getUserId(state, action);
        case actionTypes.Full_Name: return getUserFullName(state, action);
        default: return state;
    }
}


export default reducer;