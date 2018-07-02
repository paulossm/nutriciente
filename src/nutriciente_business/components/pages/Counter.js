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

/**
 * Class Counter
 * Representa o balcão do restaurante.
 * reúne os métodos de requisição e visualização das informações do balcão.
 */
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compartiments: undefined,
      loading: false,
      offline: false
    };
  }

  componentDidMount() {
    this.fetchCounterData();
  }

  /**
   * Método para recuperar as informações da API realativas ao balcão.
   */
  fetchCounterData() {
    fetch(`${API_HOST}/businesses/0/counters/0`)
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
            compartiments: data.compartiments,
            loading: false
          });
        }
      });
  }

  render() {
    const { compartiments, loading, offline } = this.state;

    if (loading) {
      return <Loading />;
    }

    if (!loading && !compartiments) {
      return <p>{"Não conseguimos carregar os dados do servidor!"}</p>;
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
        <List>
          <ListItem>
            <label className="left">Configurar Balcão</label>
            <label className="right">
              {moment()
                .locale("pt-BR")
                .format("dddd, DD/MM/YYYY")}
            </label>
          </ListItem>
          <Row style={{ magin: "14px 14px" }}>
            {compartiments.map(compartiment => {
              if (compartiment.food) {
                return (
                  <Col key={compartiment.id} width="50%">
                    <Link to={`/business/balcao/${compartiment.id}/edit`}>
                      <Card style={{ textAlign: "center" }}>
                        <img
                          src={
                            compartiment.picture
                              ? `${API_HOST}/${compartiment.picture}`
                              : no_pic
                          }
                          alt={`ícone ${compartiment.food}`}
                          style={{ width: "60%" }}
                        />
                        <h3 className="title">{compartiment.food}</h3>
                        <strong>R$ {compartiment.price}/Kg</strong>
                      </Card>
                    </Link>
                  </Col>
                );
              } else {
                return (
                  <Col key={compartiment.id} width="50%">
                    <Card style={{ textAlign: "center" }}>
                      <img
                        src={no_pic}
                        alt={`ícone sem foto`}
                        style={{ width: "60%" }}
                      />
                      <h3 className="title">compartimento vazio</h3>
                      <strong>toque para adicionar</strong>
                    </Card>
                  </Col>
                );
              }
            })}
          </Row>
        </List>
      </Page>
    );
  }
}

export default Counter;
