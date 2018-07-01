import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { Root as Business } from "./nutriciente_business/Root";
import Counter from "./nutriciente_counter/Counter";
import App from "./nutriciente_app/App";

/* ONSENUI CSS FRAMEWORK */
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

/* APP'S CSS */
import './index.css';

class Resolver extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path={`/business`} component={Business} />
                    <Route path={`/balcao`} component={Counter} />
                    <Route path={`/client`} component={App} />
                </Switch>
            </Router>
        )
    }
};

export default Resolver;
