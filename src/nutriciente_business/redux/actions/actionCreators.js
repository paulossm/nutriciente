import * as types from "../types/actionTypes";

export const logInBusiness = data => ({
    type: types.LOG_IN_BUSINESS,
    payload: data
});

export const logOutBusiness = () => ({
    type: types.LOG_OUT_BUSINESS,
    payload: undefined
});