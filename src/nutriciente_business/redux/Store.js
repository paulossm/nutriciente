import { createStore } from "redux";
import { initialState, reducer } from './reducers/Index';

export const configureStore = () => {
    const store = createStore(reducer, initialState);
    return store;
}