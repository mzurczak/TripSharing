import React, { Component } from 'react';
import { connect } from 'react-redux';

import './index.css';

import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import {List, ListItem} from 'material-ui/List';

import './index.css';
import { logOut } from '../../store/actions_creators';

class UserActionButtons_logged extends Component {

  handleLogOut = () => {
    this.props.dispatch(logOut());
    localStorage.clear();
  }

  render() {
    
    return (
      <div className = "UserButtons-logged">
        <List>
          <ListItem 
            primaryText="Edit profile" 
            leftIcon=
              {<FontIcon className="material-icons">mode_edit</FontIcon>} />
          <Divider />
          <ListItem 
            primaryText="Create new trip" 
            leftIcon=
              {<FontIcon className="material-icons">add_location</FontIcon>} />
          <ListItem 
            primaryText="Manage your trips" 
            leftIcon=
              {<FontIcon className="material-icons">edit_location</FontIcon>} />
          <Divider />
          <ListItem 
            primaryText="Log out" 
            leftIcon=
              {<FontIcon className="material-icons">power_settings_new</FontIcon>}
            onClick = { this.handleLogOut }  />
        </List>
      </div>
    );
  }
}

export default connect()(UserActionButtons_logged)