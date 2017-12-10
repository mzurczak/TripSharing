import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';
import Remove from 'material-ui/svg-icons/content/remove-circle-outline'
import Add from 'material-ui/svg-icons/content/add-circle-outline'
import { fetchEditTrip } from '../../utils/fetch_functions';

class JoinButton extends Component {
  
  handleJoinTrip = () => {
    const tripWithNewParticipant = { id: this.props.trip.id, participants: [this.props.user] };
    this.props.dispatch(fetchEditTrip(tripWithNewParticipant))
  }

  checkParticipation = () => {
    const currentUser = this.props.user
    const isParticipant = this.props.trip.participants.filter( person => person.id === currentUser.id);
    return isParticipant.length === 1;
  }
  
  render(){
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
            (this.checkParticipation())
            ? <Remove hoverColor = "white" style = {{cursor: "pointer"}} />
            : <Add hoverColor = "white" style = {{cursor: "pointer"}} />
          }
        onClick = { this.handleJoinTrip }
      />)
  }
}

export default connect()(withRouter(JoinButton))