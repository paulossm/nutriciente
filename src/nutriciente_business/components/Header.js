import React, { Component } from "react";

/* React Route */
import { Link } from "react-router-dom";

/* Layout, CSS */
import { Toolbar, ToolbarButton, Icon } from "react-onsenui";

class Header extends Component {
  render() {
    const { action, backButton, title } = this.props;
    return (
      <Toolbar>
        <div className="left">
          {backButton && (
              <ToolbarButton onClick={e => backButton.history.goBack(e)}>
                  <Icon icon="ion-chevron-left, material:md-arrow-left" />
              </ToolbarButton>
          )}
        </div>

        <div className="center">{title}</div>

        <div className="right">
          {action &&
            action.url !== undefined && (
              <Link to={action.url}>
                <ToolbarButton>
                  {action.label}
                  {action.icon && <Icon icon={action.icon} />}
                </ToolbarButton>
              </Link>
            )}
          {action &&
            action.perform !== undefined && (
              <ToolbarButton onClick={action.perform}>
                {action.label}
                {action.icon && <Icon icon={action.icon} />}
              </ToolbarButton>
            )}
        </div>
      </Toolbar>
    );
  }
}

export default Header;
