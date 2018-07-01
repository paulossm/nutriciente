import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import QrReader from "react-qr-reader";
import { RoutedTabs, NavTab } from "react-router-tabs";
import moment from "moment";
import ons from "onsenui";
import {
  Page,
  List,
  ListItem,
  Input,
  Button,
  Dialog,
  Row,
  Col,
  Card
} from "react-onsenui";
import { API_HOST } from "../nutriciente_business/redux/types/Constants";
import Loading from "../nutriciente_business/components/Loading";
import Offline from "../nutriciente_business/components/Offline";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plate: undefined,
      loading: false,
      openDialog: false,
      offline: false
    };
  }

  componentDidMount() {}

  handleScan = data => {
    if (data) {
      fetch(`${API_HOST}/users/0/transactions/0`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(plate => {
          if (plate) {
            this.setState({
              plate: plate,
              openDialog: true
            });
          } else {
            ons.notification.alert("Erro ao carregar dados do prato.");
            return;
          }
        });
    }
  };

  handleError(err) {
    console.error(err);
  }

  render() {
    const { plate, loading, offline } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <Page>
        <h4 style={{textAlign: 'center'}}>Nutriciente - Cliente</h4>
        <Card>
          <h5 className="title">Acesse as informações do seu prato</h5>
          <div id="scanner" className="content">
            <QrReader
              delay={300}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ width: "100%", marginBottom: "15px" }}
            />
            <button onClick={e => this.handleScan(true)}>Ler</button>
          </div>
        </Card>

        <Dialog isOpen={this.state.openDialog} isCancelable={true}>
            <div style={{textAlign: 'center', padding: '10px'}}>
            {plate && (
                <p>{JSON.stringify(plate)}</p>
                )}
            </div>
        </Dialog>
      </Page>
    );
  }
}

export default App;
