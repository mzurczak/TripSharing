import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

class EditButton extends Component {
  
  handleEditTrip = () => {
    this.props.history.push(`/trips/edit/${this.props.trip.id}`)
  }
  
  render(){
    const { trip, user  } = this.props;
    if (user.username === trip.host.username) {
      return (
        <IconButton style = {{ color: "black"}} onClick = { this.handleEditTrip }>
          <FontIcon className="material-icons" style = {{cursor: "pointer"}}>create</FontIcon>
        </IconButton>)
    } else {
      return ""
    }
  }
}

const mapStateToProps = ( { userReducer, tripsReducer }) => {
  var user = {};
  var trip = {};
  if (userReducer.userInfo !== undefined && Object.values(tripsReducer.trips).length > 0) {
    user = userReducer.userInfo
    trip = tripsReducer.trips
  }
  return ({
    user,
    trip
  })
}

export default connect(mapStateToProps)(withRouter(EditButton))