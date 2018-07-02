import React from "react";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import Counter from "./components/pages/Counter";
import CounterItem from "./components/pages/CounterItem";
import Today from "./components/pages/Today";

/* REDUX STORE CONFIGURATION */
import { configureStore } from "./redux/Store";

const store = configureStore();

/**
 * Class Root.
 * Representa o componente que mapeia as URL para as respectivas páginas.
 */
export class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Switch>
          <Route exact path="/business/login" component={Login} />
          <Route exact path="/business/home" component={Home} />
          <Route exact path="/business/home/hoje" component={Today} />
          <Route exact path="/business/balcao" component={Counter} />
          <Route path="/business/balcao/:id/edit" component={CounterItem} />
        </Switch>
      </Provider>
    );
  }
}
