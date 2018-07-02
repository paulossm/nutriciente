import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { RoutedTabs, NavTab } from "react-router-tabs";
import moment from "moment";
import ons from "onsenui";
import { Page, List, ListItem, Input, Button } from "react-onsenui";
import Header from "../Header";
import { API_HOST } from "../../redux/types/Constants";
import Loading from "../Loading";
import Offline from "../Offline";


/**
 * Classe Home.
 * Representa a página inicial da aplicação.
 */
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: undefined,
      loading: false,
      offline: false
    };
  }

  componentDidMount() {
    fetch(`${API_HOST}/businesses/0/today`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(data => {
        if (!data) {
          ons.notification.alert(
            "Não foi possível carregar os dados dos servidor neste momento."
          );
          this.setState({
            loading: false
          });
        } else {
          this.setState({
            today: data,
            loading: false
          });
        }
      });
  }

  render() {
    const { today, loading, offline } = this.state;

    if (loading) {
      return <Loading />;
    }

    if (!loading && !today) {
      return <p>{"Não conseguimos carregar os dados do servidor!"}</p>;
    }

    return (
      <Page renderToolbar={() => <Header title={"Análise Geral"} />}>
        <List>
          <ListItem>
            <label className="left">
              <Link to="/business/home/hoje">hoje ></Link>
            </label>
            <label className="right">
              {moment()
                .locale("pt-BR")
                .format("dddd, DD/MM/YYYY")}
            </label>
          </ListItem>
          <ListItem>
            <label className="left">Pratos Feitos</label>
            <label className="right">{today.dishes}</label>
          </ListItem>
          <ListItem>
            <label className="left">Peso Total</label>
            <label className="right">{today.weight}</label>
          </ListItem>
          <ListItem>
            <label className="left">Calorias</label>
            <label className="right">{today.calories}</label>
          </ListItem>
          <ListItem>
            <label className="left">Arrecadado</label>
            <label className="right">{today.collection}</label>
          </ListItem>
        </List>
      </Page>
    );
  }
}

export default Home;
