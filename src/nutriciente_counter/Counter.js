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
import { API_HOST } from "../nutriciente_business/redux/types/Constants";
import Loading from "../nutriciente_business/components/Loading";
import Offline from "../nutriciente_business/components/Offline";
import qrcode from "./img/qrcode.png";

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
      return <p>Não conseguimos carregar os dados do servidor! :X</p>;
    }

    return (
      <Page
      >
        <Row>
          <Col width="42%" style={{marginRight: '4%'}}>
            <List>
              <ListItem>
                <label className="left">Informações do Balcão</label>
              </ListItem>
              <Row style={{ magin: "14px 14px" }}>
                {compartiments.map(compartiment => {
                  if (compartiment.food) {
                    return (
                      <Col key={compartiment.id} width="50%">
                          <Card style={{ textAlign: "center" }}>
                            <h3 className="title">{compartiment.food}</h3>
                            <strong>R$ {compartiment.price}/Kg</strong>
                          </Card>
                      </Col>
                    );
                  } else {
                    return (
                      <Col key={compartiment.id} width="50%">
                        <Card style={{ textAlign: "center" }}>
                          <h3 className="title">compartimento vazio</h3>
                          <strong>toque para adicionar</strong>
                        </Card>
                      </Col>
                    );
                  }
                })}
              </Row>
            </List>
          </Col>
          
          <Col width="42%">
            <List>
              <ListItem>
                <label className="title list-item__title">Salvar Dados</label>
                <img src={qrcode} />
              </ListItem>
            </List>
          </Col>
        </Row>
      </Page>
    );
  }
}

export default Counter;
