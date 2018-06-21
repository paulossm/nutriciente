import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Resolver from "./Resolver";

/* ONSENUI CSS FRAMEWORK */
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

/* APP'S CSS */
import './index.css';

ReactDOM.render(
    <Resolver />,
    document.getElementById('root')
);

registerServiceWorker();