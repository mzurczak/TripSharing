import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './index.css';

import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import {List, ListItem} from 'material-ui/List';

import './index.css';
import { logOut } from '../../store/actions_creators';

class UserActionButtons_logged extends Component {

  handleLogOut = () => {
    this.props.dispatch(logOut())
    this.props.history.push("/");
    localStorage.clear();
  }

  handleManageTrips = () => {
    this.props.history.push('/mytrips');
  }

  handleCreateTrip = () => {
    this.props.history.push('/trip/create');
  }

  render() {
    return (
      <div className = "UserButtons-logged">
      <h2>Hello {this.props.username}!</h2>
        <List>
          <ListItem 
            primaryText="Edit profile" 
            leftIcon=
              {<FontIcon className="material-icons">mode_edit</FontIcon>} />
          <Divider />
          <ListItem 
            primaryText="Create new trip" 
            leftIcon=
              {<FontIcon className="material-icons">add_location</FontIcon>} 
              onClick = { this.handleCreateTrip }/>
          <ListItem 
            primaryText="Manage your trips" 
            leftIcon=
              {<FontIcon className="material-icons">edit_location</FontIcon>} 
            onClick = { this.handleManageTrips }/>
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

const mapStateToProps = ({userReducer}) => {
  return({
    username: userReducer.userInfo.username
  })
}
export default connect(mapStateToProps)(withRouter(UserActionButtons_logged))