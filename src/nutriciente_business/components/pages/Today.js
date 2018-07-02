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
  Card,
  ActionSheet,
  ActionSheetButton
} from "react-onsenui";
import Header from "../Header";
import { API_HOST } from "../../redux/types/Constants";
import Loading from "../Loading";
import Offline from "../Offline";
import plate_icon from "../../static/img/breakfast.svg";
import balance_icon from "../../static/img/scale.svg";
import timeline from "../../static/img/timeline.png";
import * as jsPDF from "jspdf";
import * as html2canvas from "html2canvas";

/**
 * Classe Home.
 * Representa a página de informações do dia.
 */
class Today extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resume: undefined,
      transcations: undefined,
      loading: false,
      offline: false,
      actions: false
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
            resume: data.resume,
            timeline: data.timeline,
            transactions: data.transactions,
            loading: false
          });
        }
      });
  }

  /**
   * generatePDF
   * método que gera o PDF do HTML da página.
   */
  generatePDF() {
    html2canvas(document.body).then(canvas => {
      var img = canvas.toDataURL("image/png");
      var doc = new jsPDF();
      doc.addImage(img, "JPEG", 20, 20);
      doc.save("resumo-de-hoje.pdf");
    });
    this.closeActions();
  }

  /**
   * openActions
   * método que abre as opções de compartilhamento da página.
   */
  openActions() {
    this.setState({
      actions: true
    });
  }

  /**
   * closeActions
   * método que fecha as opções de compartilhamento da página.
   */
  closeActions() {
    this.setState({
      actions: false
    });
  }

  render() {
    const { resume, transactions, loading, offline } = this.state;

    if (loading) {
      return <Loading />;
    }

    if (!loading && !resume) {
      return <p>{"Não conseguimos carregar os dados do servidor!"}</p>;
    }

    return (
      <Page
        renderToolbar={() => (
          <Header
            backButton={{ history: this.props.history }}
            title={"Resumo de Hoje"}
            action={{
              icon: "ion-ios-upload-outline",
              perform: this.openActions.bind(this)
            }}
          />
        )}
      >
        <section id="plates" style={{ marginLeft: "15px" }}>
          <h3>Pratos</h3>
          <Row>
            <Col width="33%" style={{ textAlign: "center" }}>
              <Card>
                <img src={plate_icon} alt="prato" />
                <label className="title">{resume.dishes}</label>
              </Card>
            </Col>
            <Col width="33%" style={{ textAlign: "center" }}>
              <Card>
                <img src={balance_icon} alt="prato" />
                <label className="title">{resume.weight}</label>
              </Card>
            </Col>
            <Col width="33%" style={{ textAlign: "center" }}>
              <Card>
                <label className="title">Média</label>
                <strong>
                  {(parseFloat(resume.weight) / resume.dishes).toFixed(3)}
                  {"Kg / Prato"}
                </strong>
              </Card>
            </Col>
          </Row>
        </section>

        <section id="timeline" style={{ marginLeft: "15px" }}>
          <h3>Linha do Tempo</h3>
          <img src={timeline} alt="Linha do tempo" style={{ width: "100%" }} />
        </section>

        <section id="transactions" style={{ marginLeft: "15px" }}>
          <h3>Transações</h3>
          <List>
            {transactions.map(transaction => {
              return (
                <ListItem>
                  <div className="left">{transaction.id}</div>
                  <div className="center">
                    {moment(transaction.time.$date).format("HH:mm")}
                  </div>
                  <div className="left">{transaction.weight}Kg</div>
                </ListItem>
              );
            })}
          </List>
        </section>

        <ActionSheet
          isOpen={this.state.actions}
          title="Exportar resumo"
          isCancelable={true}
        >
          <ActionSheetButton onClick={this.generatePDF.bind(this)}>
            Exportar PDF
          </ActionSheetButton>
          <ActionSheetButton
            onClick={this.closeActions.bind(this)}
            icon={"md-close"}
          >
            Cancelar
          </ActionSheetButton>
        </ActionSheet>
      </Page>
    );
  }
}

export default Today;
