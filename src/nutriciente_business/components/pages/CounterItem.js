import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { RoutedTabs, NavTab } from "react-router-tabs";
import moment from "moment";
import ons from "onsenui";
import {
  Page,
  List,
  ListItem,
  Input,
  Button,
  Row,
  Col,
  Card
} from "react-onsenui";
import Header from "../Header";
import { API_HOST } from "../../redux/types/Constants";
import Loading from "../Loading";
import Offline from "../Offline";
import no_pic from "../../img/no-pictures.svg";

class CounterItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: undefined,
      food: "",
      price: 0,
      calories: undefined,
      comments: "",
      loading: false,
      offline: false,
      formSuccess: false
    };
  }

  componentDidMount() {
    fetch(
      `${API_HOST}/businesses/0/counters/0/items/${
        this.props.match.params.id
      }/edit`
    )
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
            id: data.id,
            food: data.food,
            price: data.price,
            calories: data.calories,
            comments: data.comments,
            loading: false
          });
        }
      });
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submit = e => {
    e.preventDefault();
    let { formSuccess, ...compartiment } = this.state;
    if (compartiment.food && compartiment.price) {
      ons.notification
        .confirm("Deseja atualizar o alimento no balcão?", {
          title: "confirmar",
          buttonLabels: ["Cancelar", "Sim"]
        })
        .then(response => {
          if (response) {
            let transaction = {
              compartiment: {
                food: compartiment.food,
                price: compartiment.price,
                calories: compartiment.calories,
                comments: compartiment.comments
              }
            };
            fetch(
              `${API_HOST}/businesses/0/counters/0/items/${compartiment.id}`,
              {
                method: "POST",
                body: JSON.stringify(transaction),
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json"
                }
              }
            )
              .then(response => {
                if (response.ok) {
                  this.setState({
                    formSuccess: true
                  });
                } else {
                  ons.notification.alert(
                    "Ocorreu um erro ao atualizar o alimento. tente novamente mais tarde."
                  );
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        });
    } else {
      ons.notification
        .alert("Favor preencha o mínimo de informações sobre o alimento.", {
          title: "Atenção",
          buttonLabels: "Ok"
        })
        .then(e => false);
    }
  };

  render() {
    const { loading, offline, formSuccess, ...compartiment } = this.state;

    if (formSuccess) {
      return <Redirect to="/business/balcao" />;
    }

    if (loading) {
      return <Loading />;
    }

    if (!loading && !compartiment) {
      return <p>Não conseguimos carregar os dados do servidor! :X</p>;
    }

    return (
      <Page
        renderToolbar={() => (
          <Header
            backButton={{ history: this.props.history }}
            title={"Balcão"}
          />
        )}
      >
        <form onSubmit={e => this.submit(e)}>
          <List>
            <ListItem>
              <div className="center">
                <label>Nome do alimento</label>
                <Input
                  value={compartiment.food}
                  onChange={e => this.change(e)}
                  modifier="underbar"
                  name="food"
                  placeholder=""
                  required
                  style={{ width: "100%" }}
                />
              </div>
            </ListItem>
            <ListItem>
              <div className="center">
                <label>Preço</label>
                <Input
                  type="number"
                  value={compartiment.price}
                  onChange={e => this.change(e)}
                  modifier="underbar"
                  name="price"
                  placeholder="Preço (R$)"
                  style={{ width: "100%" }}
                  required
                />
              </div>
            </ListItem>
            <ListItem>
              <div className="center">
                <label>Calorias (opcional)</label>
                <Input
                  type="number"
                  value={compartiment.calories}
                  onChange={e => this.change(e)}
                  modifier="underbar"
                  name="calories"
                  placeholder="Quantidade em Kcal"
                  style={{ width: "100%" }}
                />
              </div>
            </ListItem>
            <ListItem>
              <div className="center">
                <label>Comentários (opcional)</label>
                <Input
                  value={compartiment.comments}
                  onChange={e => this.change(e)}
                  modifier="underbar"
                  name="comments"
                  placeholder="Comentários sobre a comida/preparo"
                  style={{ width: "100%" }}
                  required
                />
              </div>
            </ListItem>
          </List>
          <div style={{ padding: "8px 0 32px" }}>
            <div style={{ float: "right" }}>
              <input type="submit" className="button" value="finalizar" />
            </div>
          </div>
        </form>
      </Page>
    );
  }
}

export default CounterItem;
