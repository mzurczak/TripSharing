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

class EditUser extends Component {
  
  componentDidMount() {
    this.props.dispatch(fetchSpecificTrip(this.props.match.params.tripId))
  }

  constructor () {
    super();
    this.state = {}
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.currentTarget.value,
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
      startDate
    });
  }

  handleEndDate = (event, date) => {
    let moment = new Moment(date);
    let endDate = moment.format('DD/MM/YYYY')
    this.setState({
      endDate
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
          <form>
            <TextField
              hintText = "Name"
              floatingLabelText = "Trip name"
              defaultValue = { this.props.trip.name }
              onChange = { this.handleNameChange }
            /><br />
            <TextField
              hintText = "Description"
              floatingLabelText = "Description"
              defaultValue = { this.props.trip.description }
              onChange = { this.handleDescriptionChange }
            /><br />
            <DatePicker
              onChange = { this.handleStartDate }
              floatingLabelText = "Start date"
              // defaultDate = { this.props.trip.startDate }
            /><br />
            <DatePicker
              onChange = { this.handleEndDate }
              floatingLabelText = "End date"
              // defaultDate = { this.props.trip.endDate }
            /><br />
            { renderButtons() }
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ( { tripsReducer } ) => {

  return({
    trip: tripsReducer.trips
  })
}
export default connect(mapStateToProps)(withRouter(EditUser))