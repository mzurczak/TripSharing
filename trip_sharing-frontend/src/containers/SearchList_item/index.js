import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './index.css';

import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

import TripItem from '../../components/Trips_item';

class SearchListItem extends Component {
  
  handleEditTrip = () => {
    this.props.history.push(`/trips/edit/${this.props.trip.id}`)
  }
  
  
  render(){
    const { trip, user  } = this.props;
    const renderEditButton = () => {
      if (user.username === trip.host.username) {
        return (
          <IconButton style = {{ color: "black"}} onClick = { this.handleEditTrip }>
            <FontIcon className="material-icons" style = {{cursor: "pointer"}}>create</FontIcon>
          </IconButton>)
      }
    }

    return(
      <div className = "SearchList-body">
        <div className = "SearchList-item">
          <TripItem trip = { trip } />
        </div>
        <div className = "SearchList-description">
          <h2>Description: </h2>
          { renderEditButton() }
          <p> { trip.description } </p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ( { userReducer }) => {
  var user = {}
  if (userReducer.userInfo !== undefined) {
    user = userReducer.userInfo
  }
  return ({
    user
  })
}
export default connect(mapStateToProps)(withRouter(SearchListItem));