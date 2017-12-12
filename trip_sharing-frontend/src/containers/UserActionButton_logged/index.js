import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './index.css';

import AddTrip from 'material-ui/svg-icons/maps/add-location';
import Create from 'material-ui/svg-icons/content/create';
import Divider from 'material-ui/Divider';
import EditTrip from 'material-ui/svg-icons/maps/edit-location';
import {List, ListItem} from 'material-ui/List';
import LogOut from 'material-ui/svg-icons/action/power-settings-new';

import './index.css';

class UserActionButtons_logged extends Component {

  handleLogOut = () => {
    localStorage.clear();
    this.props.history.push("/");
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
              { <Create /> } />
          <Divider />
          <ListItem 
            primaryText="Create new trip" 
            leftIcon=
              {<AddTrip />} 
            onClick = { this.handleCreateTrip }/>
          <ListItem 
            primaryText="Manage your trips" 
            leftIcon=
              {<EditTrip />} 
            onClick = { this.handleManageTrips }/>
          <Divider />
          <ListItem 
            primaryText="Log out" 
            leftIcon=
              {<LogOut />}
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