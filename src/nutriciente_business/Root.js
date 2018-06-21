import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from "./components/pages/Login";

/* REDUX STORE CONFIGURATION */
import { configureStore } from "./redux/Store";

const store = configureStore();

export class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Switch>
                    <Route path="/business/login" component={Login} />
                    {/* <Route path="/business" component={App} /> */}
                </Switch>
            </Provider>
        )
    }
};