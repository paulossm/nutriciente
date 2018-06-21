import * as types from "../types/actionTypes";

export const initialState = {
    business: {}
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case types.LOG_IN_BUSINESS:
            return { ...state, business: action.payload }
        case types.LOG_OUT_BUSINESS:
            return { ...state, business: {} }
        default:
            return state;
    }
}