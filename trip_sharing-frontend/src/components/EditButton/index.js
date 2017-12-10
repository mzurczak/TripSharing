import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';
import Create from 'material-ui/svg-icons/content/create'

class EditButton extends Component {
  
  handleEditTrip = () => {
    this.props.history.push(`/trips/edit/${this.props.tripId}`)
  }
  
  render(){
    return (
      <FlatButton
        style = {{backgroundColor: "Aquamarine", color: "black"}}
        label="Edit trip"
        labelPosition="after"
        primary={true}
        icon={
        <Create />
        }
        onClick = { this.handleEditTrip }
    />)
  }
}

export default withRouter(EditButton)