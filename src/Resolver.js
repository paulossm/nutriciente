import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { Root as Business } from "./nutriciente_business/Root";

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
                </Switch>
            </Router>
        )
    }
};

export default Resolver;
