import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import { fetchEditTrip } from '../../utils/fetch_functions';

class EditButton extends Component {
  
  handleJoinTrip = () => {
    const tripWithNewParticipant = { id: this.props.trip.id, participants: this.props.user.id };
    this.props.dispatch(fetchEditTrip(tripWithNewParticipant))
  }

  checkParticipation = () => {
    const currentUser = this.props.user
    const isParticipant = this.props.trip.participants.filter( person => person.id === currentUser.id);
    return isParticipant.length === 1;
  }
  
  render(){
    console.log(this.props);
    return (
      <FlatButton
        style = { {backgroundColor: "Aquamarine", color: "black"} }
        label = {
          (this.checkParticipation())
          ? 'Leave trip'
          : 'Join trip'
        }
        labelPosition = "after"
        primary = { true }
        icon = {
          <FontIcon className="material-icons" hoverColor = "white" style = {{cursor: "pointer"}}>
          {
            (this.checkParticipation())
            ? 'remove_circle_outline'
            : 'add_circle_outline'
          }
          </FontIcon>
        }
        onClick = { this.handleJoinTrip }
      />)
  }
}

export default connect()(withRouter(EditButton))