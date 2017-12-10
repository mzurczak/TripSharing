import React, { Component } from 'react';

import './index.css';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Unlogged from '../../containers/UserActionButton_unlogged';
import Logged from '../../containers/UserActionButton_logged';

export default class UserActionMenu extends Component {

  state = {
    open: false
  };

  handleOpenMenu = () => {
    this.setState({
      openMenu: true,
    });
  }
  
  render() {
    
    const renderMenu = () => (localStorage.getItem('token'))
        ? <Logged />
        : <Unlogged />
    
    return (
      <IconMenu
        iconButtonElement={
        <IconButton>
          <FontIcon className="material-icons" hoverColor = "white" style = {{cursor: "pointer"}}>account_circle</FontIcon>
        </IconButton>
        }
        anchorOrigin = { {vertical: 'bottom', horizontal: 'left'} }
        targetOrigin = { {vertical: 'top', horizontal: 'right'} }
        open={this.state.openMenu}
      >
        <div className = "UserActionMenu">
          { renderMenu() }
        </div>
      </IconMenu>
    );
  }
}