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
import { fetchSpecificTrip, fetchEditTrip, fetchDeleteTrip } from '../../utils/fetch_functions';

class EditTrip extends Component {
  
  componentDidMount() {
    this.props.dispatch(fetchSpecificTrip(this.props.match.params.tripId))
  }

  constructor () {
    super();

    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear());
    minDate.setHours(0, 0, 0, 0);

    this.state = {
      minDate,
    };
  }

  handleTitleChange = (e) => {
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
  
  handleEdit = (e) => {
    e.preventDefault();
    let newTrip = { ...this.state }
    newTrip.id = this.props.match.params.tripId;
    this.props.dispatch(fetchEditTrip(newTrip))
    .then(() => {
        this.setState({})
        this.props.history.push(`/trips/${newTrip.id}`)
    });
  }
    
  handleDelete = (e) => {
    e.preventDefault();
    let tripId = this.props.match.params.tripId;
    this.props.dispatch(fetchDeleteTrip(tripId))
    .then(() => {
      this.props.history.push("/")
    });
  }

  disableDays = (date) => {
    return date < this.state.minDate || date > this.state.maxDate
  }

  render() {
    const renderButtons = () => {
      return (
        <div>
          <IconButton onClick = { this.handleEdit } >
            <FontIcon className="material-icons" style = {{cursor: "pointer"}}>save</FontIcon>
          </IconButton>
          <IconButton onClick = { this.handleDelete } >
            <FontIcon className="material-icons" hoverColor = "red" style = {{cursor: "pointer"}}>delete</FontIcon>
          </IconButton>
        </div>
      )
    }
    return (
      <div>
        <Header />
        <div className="Edit-body">
          <h2>Edit your trip </h2>
          {
            (this.props.trip !== undefined)
            ? 
            (<form>
              <TextField
                hintText = "Title"
                floatingLabelText = { this.props.trip.name }
                onChange = { this.handleTitleChange }
              /><br />
              <TextField
                hintText = "Description"
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
            </form>)
            : ""
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ( { tripsReducer }, props ) => {
  const trip = Object.values(tripsReducer.trips).filter(trip => trip.id === props.match.params.tripId)
  return({
    trip
  })
}
export default connect(mapStateToProps)(withRouter(EditTrip))