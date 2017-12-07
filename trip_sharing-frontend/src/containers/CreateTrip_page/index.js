import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'moment'

import DatePicker from 'material-ui/DatePicker';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';

import './index.css'

import Header from '../Header';
import { fetchCreateTrip } from '../../utils/fetch_functions';

class CreateTrip extends Component {
  
  constructor () {
    super();

    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear());
    minDate.setHours(0, 0, 0, 0);

    this.state = {
      title: null,
      description: null,
      
      minDate,
    };
  }

  handleNameChange = (e) => {
    this.setState({
      title: e.currentTarget.value,
    })
  }

  handleDescriptionChange = (e) => {
    this.setState({
      description: e.currentTarget.value,
    })
  }

  handleStartDate = (event, date) => {
    let moment = new Moment(date);
    let startDate = moment.format('DD/MM/YYYY')
    this.setState({
      minDate: moment,
      startDate
    });
  }
  
  handleEndDate = (event, date) => {
    let moment = new Moment(date);
    let endDate = moment.format('DD/MM/YYYY')
    this.setState({
      maxDate: moment,
      endDate
    })
  }
  
  handlePlacesChange = (e) => {
    this.setState({
      places: e.currentTarget.value,
    })
  }
 
  handleTransportationChange = (e) => {
    this.setState({
      transportation: e.currentTarget.value,
    })
  }

  handlePhotoChange = (e) => {
    this.setState({
      photo: e.currentTarget.value,
    })
  }

  handleBudgetChange = (e) => {
    this.setState({
      budget: e.currentTarget.value,
    })
  }

  handleCreate = (e) => {
    e.preventDefault();
    let newTrip = { ...this.state }
    this.props.dispatch(fetchCreateTrip(newTrip))
    .then(() => {
        this.setState({})
        this.props.history.push(`/mytrips`)
    });
  }
    
  disableDays = (date) => {
    return date < this.state.minDate || date > this.state.maxDate
  }

  render() {
    const renderButtons = () => {
      if (this.state.title !== null && this.state.description !== null){
        return (
          <div>
            <IconButton onClick = { this.handleCreate } >
              <FontIcon className="material-icons" style = {{cursor: "pointer"}}>save</FontIcon>
            </IconButton>
          </div>
        )
      }
    }
    return (
      <div>
        <Header />
        <div className="Create-body">
          <h2>Create your trip </h2>
          {
            <form>
              <TextField
                floatingLabelText = "Name"
                onChange = { this.handleNameChange }
              /><br />
              <TextField
                fullWidth = { true }
                floatingLabelText = "Description"
                onChange = { this.handleDescriptionChange }
              /><br />
              <DatePicker
                onChange = { this.handleStartDate }
                floatingLabelText = "Start date"
                shouldDisableDate={this.disableDays}
              /><br />
              <DatePicker
                onChange = { this.handleEndDate }
                floatingLabelText = "End date"
                shouldDisableDate={this.disableDays}
              /><br />
              <TextField
                floatingLabelText = "Places"
                onChange = { this.handlePlacesChange }
              /><br />
              <TextField
                floatingLabelText = "Transportation"
                onChange = { this.handleTransportationChange }
              /><br />
              <TextField
                floatingLabelText = "Photo URL"
                onChange = { this.handlePhotoChange }
              /><br />
              <TextField
                floatingLabelText = "Budget"
                onChange = { this.handleBudgetChange }
              /><br />
              { renderButtons() }
            </form>
          }
        </div>
      </div>
    )
  }
}

// const mapStateToProps = ( { tripsReducer }, props ) => {
//   const trip = Object.values(tripsReducer.trips).filter(trip => trip.id === props.match.params.tripId)
//   return({
//     trip
//   })
// }
export default connect()(withRouter(CreateTrip))