import React, { Component } from 'react';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

import UserActionMenu from '../../components/UserActionMenu'

class UserActionContainer extends Component {

  state = {
    open: false
  };

  handleOpenMenu = () => {
    this.setState({
      openMenu: true,
    });
  }

  render(){
    return(
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
          <UserActionMenu />
      </IconMenu>
    )
  }
}
export default UserActionContainer;