import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ons from "onsenui";
import { Page, List, ListItem, Input, Button } from "react-onsenui";
import { connect } from "react-redux";
import { logInBusiness } from "../../redux/actions/actionCreators";
import { API_HOST } from "../../redux/types/Constants";
import Loading from "../Loading";
import Offline from "../Offline";

import logo from "../../static/img/logo.png";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      success: false,
      loading: false,
      offline: false
    };
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submit(e) {
    e.preventDefault();
    this.setState({
      loading: true
    });
    let { email, password, success } = this.state;
    if (email !== "" && password !== "") {
      fetch(`${API_HOST}/businesses/auth`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(data => {
          if (!data) {
            ons.notification.alert("email ou senha incorretos");
            this.setState({
              success: false,
              loading: false
            });
          } else {
            localStorage.setItem("business", JSON.stringify(data));
            this.props.logInBusiness(data);
            this.setState({
              success: true,
              loading: false
            });
          }
        })
        .catch(e => {
          console.error(e);
          this.setState({
            loading: false,
            offline: true
          });
        });
    } else {
      ons.notification.alert("Por favor, preencha todos os campos.");
      this.setState({
        loading: false,
        success: false
      });
    }
  }

  render() {
    const { email, password, success, loading, offline } = this.state;
    if (success) {
      return <Redirect to="/business/home" />;
    }

    if (loading) {
      return <Loading />;
    }

    return (
      <Page>
        <img
          id="logo"
          src={logo}
          alt="Nutriciente - empresas"
          style={{
            maxWidth: "120px",
            display: "block",
            margin: "16px auto 32px"
          }}
        />
        <h3 style={{ textAlign: "center" }}>Login</h3>
        {!loading && offline && <Offline />}

        {!loading &&
          !offline && (
            <form onSubmit={e => this.submit(e)}>
              <List>
                <ListItem>
                  <div className="left">e-mail</div>
                  <div className="center">
                    <Input
                      value={email}
                      onChange={e => this.change(e)}
                      name="email"
                      required="required"
                    />
                  </div>
                </ListItem>
                <ListItem>
                  <div className="left">senha</div>
                  <div className="center">
                    <Input
                      value={password}
                      type="password"
                      onChange={e => this.change(e)}
                      name="password"
                      required="required"
                    />
                  </div>
                </ListItem>
                <ListItem>
                  <div className="center">
                    <Button
                      type="submit"
                      modifier="large"
                      onClick={this.submit.bind(this)}
                    >
                      Entrar
                    </Button>
                  </div>
                </ListItem>
              </List>
            </form>
          )}
      </Page>
    );
  }
}

const mapStateToProps = store => ({
  business: store.business
});

const mapDispatchToProps = dispatch => ({
  logInBusiness: data => dispatch(logInBusiness(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
