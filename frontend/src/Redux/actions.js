import * as actionTypes from "./actionTypes";

export const login = () => {
    return {
        type: actionTypes.LOG_IN
    };
};

export const logout = () => {
    return {
        type: actionTypes.LOG_OUT
    };
};

export const getToken = (token) => {
    return {
        type: actionTypes.TOKEN,
        token: token
    };
};

export const getUserFullName = (fullName) => {
    return {
        type: actionTypes.Full_Name,
        fullName: fullName
    };
};

export const getUserId = (id) => {
    return {
        type: actionTypes.USER_ID,
        id: id
    };
};

