import React, { Component } from "react";
import { Page, List, ListItem, Button } from "react-onsenui";

/**
 * Classe Offline.
 * Representa a página que mostra o aplicativo offline.
 */
class Offline extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Page className="offline">
        <div className="alertbox">
          <img
            id="offline_icon"
            src={offline_icon}
            alt="Icon wifi sign with an x"
          />
          <h2>{"Você está offline"}</h2>
          {this.props.actions && (
            <div className="actions">
              {this.props.actions.map((action, index) => (
                <Button key={index} onClick={e => action.perform(e)}>
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </Page>
    );
  }
}

export default Offline;
