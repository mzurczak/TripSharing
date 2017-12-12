import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'moment'

import AddPlace from 'material-ui/svg-icons/maps/add-location';
import DatePicker from 'material-ui/DatePicker';
import Delete from 'material-ui/svg-icons/action/delete';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import RemovePlace from 'material-ui/svg-icons/navigation/cancel'
import Save from 'material-ui/svg-icons/content/save';
import TextField from 'material-ui/TextField';

import './index.css'

import Header from '../../components/Header';
import { fetchSpecificTrip, fetchEditTrip, fetchDeleteTrip } from '../../utils/tripFetch_functions';

class EditTrip extends Component {
  
  constructor () {
    super();
    
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear());
    currentDate.setHours(0, 0, 0, 0);
    // const minDate = new Date();
    // minDate.setFullYear(minDate.getFullYear());
    // minDate.setHours(0, 0, 0, 0);
    
    this.state = {
      title: null,
      description: null,
      startDate: null,
      endDate: null,
      places: [],
      participants: null,
      newPlace: '',
      transportation: null,
      photo: null,
      budget: null,
      currentPlaces: [],
      currentDate,
      // minDate,
    };
  }
  
  componentDidMount() {
    this.props.dispatch(fetchSpecificTrip(this.props.match.params.tripId))
      .then(this.handleDateLoad())
      .then(()=>{
        if (this.props.trip !== undefined){
          let arrayOfPlaces = [];
          this.props.trip.places.forEach(place => {
            arrayOfPlaces.push(place)
          })
          this.setState({
            currentPlaces: arrayOfPlaces
          })
        }
      })
  }

  handleDateLoad = () => {
    if (this.props.trip === undefined ) {
      return true;
    }
    
    if (this.props.trip.startDate !== null){
      const startDate = this.props.trip.startDate;
      let moment = new Moment(startDate);
      this.setState({
        minDate: moment._d
      });
    }

    if (this.props.trip.endDate !== null){
      const endDate = this.props.trip.endDate;
      let moment = new Moment(endDate);
      this.setState({
        maxDate: moment._d
      })
    }
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
    let startDate = moment.format('MM/DD/YYYY')
    this.setState({
      minDate: date,
      startDate
    });
  }
  
  handleEndDate = (event, date) => {
    let moment = new Moment(date);
    let endDate = moment.format('MM/DD/YYYY')
    this.setState({
      maxDate: date,
      endDate
    })
  }

  handlePlacesChange = (e) => {
    this.setState({
      newPlace: e.currentTarget.value,
    })
  }

  handlePlacesRemove = (e) => {
    console.log(e)
    // let newPlacesToChange = [...this.state.places];
    // let newCurrentPlaces = [...this.state.currentPlaces]
    // if(!newPlacesToChange.includes(place)){
    //   newPlacesToChange.push(place)
    // } else {
    //   newPlacesToChange = newPlacesToChange.filter( placeFromArray => placeFromArray !== place)
    // }
    // newCurrentPlaces = newCurrentPlaces.filter(placeFromState => placeFromState !== place) 
    // this.setState({
    //   currentPlaces: newCurrentPlaces,
    //   places: newPlacesToChange,
    // })
  }

  handleAddPlace = () => {
    let newPlacesToChange = this.state.places;
    let newCurrentPlaces = [...this.state.currentPlaces];
    let place = this.state.newPlace;
    if(!newPlacesToChange.includes(place)){
      newPlacesToChange.push(place);
      newCurrentPlaces.push(place)
    } 
    if (newCurrentPlaces.includes(place)){
      newCurrentPlaces.filter( currentPlace => currentPlace !== place)
    }
    this.setState({
      newPlace: '',
      currentPlaces: newCurrentPlaces,
      places: newPlacesToChange,
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
    let newTrip = { 
      name: this.state.title,
      description: this.state.description,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      places: this.state.places,
      participants: this.state.participants,
      transportation: this.state.transportation, 
      photo: this.state.photo, 
      budget: this.state.budget 
    }

    newTrip.id = this.props.match.params.tripId;
    this.props.dispatch(fetchEditTrip(newTrip))
    .then(this.props.history.push(`/trips/${newTrip.id}`));
  }
    
  handleDelete = (e) => {
    e.preventDefault();
    let tripId = this.props.match.params.tripId;
    this.props.dispatch(fetchDeleteTrip(tripId))
    .then(() => {
      this.props.history.push("/")
    });
  }

  disableStartDays = (date) => {
    return date < this.state.currentDate || date > this.state.maxDate
  }
    
  disableEndDays = (date) => {
    return date < this.state.minDate
  }

  render() {
    const renderButtons = () => {
      return (
        <div className="Edit-buttons">
          <FlatButton 
            onClick = { this.handleEdit }
            style = {{backgroundColor: "Aquamarine", color: "black"}}
            label="Edit trip"
            labelPosition="after"
            primary={true}
            icon = { <Save  className="material-icons" style = {{cursor: "pointer"}} /> } 
          />
          <FlatButton 
            onClick = { this.handleDelete }
            style = { {backgroundColor: "Aquamarine", color: "black"} }
            label = "Delete trip"
            labelPosition = "after"
            primary = { true }
            icon = { <Delete  className = "material-icons" hoverColor = "red" style = { {cursor: "pointer"} } /> }
          />
        </div>
      )
    }

    const { trip } = this.props;
    
    return (
      <div>
        <Header />
        {
          (trip !== undefined)
          ? (<div className="Edit-body">
            <h2>Edit your trip </h2>
            {<div>
              <form>
                <Paper className = "Edit-general" zDepth = {2} style = {{backgroundColor: 'azure'}}>
                  <h2> General </h2>
                  <TextField
                    floatingLabelText = "Title"
                    defaultValue = { trip.name }
                    onChange = { this.handleTitleChange }
                  /><br />
                  <div>
                  <DatePicker
                    onChange = { this.handleStartDate }
                    floatingLabelText = "Start date"
                    autoOk = { true }
                    defaultDate = { this.state.minDate }
                    shouldDisableDate={this.disableStartDays}
                  /><br />
                  <DatePicker
                    onChange = { this.handleEndDate }
                    floatingLabelText = "End date"
                    autoOk = { true }
                    defaultDate = { this.state.maxDate }
                    shouldDisableDate={this.disableEndDays}
                  /><br />
                  </div>
                  <TextField
                    fullWidth = { true }
                    multiLine= { true }
                    rows= { 5 }
                    defaultValue = { trip.description }
                    floatingLabelText = "Description"
                    onChange = { this.handleDescriptionChange }
                  /><br />
                </Paper>
                <Paper className = "Edit-places" zDepth = {2} style = {{backgroundColor: 'azure'}}>
                  <h2> Places </h2>
                  <TextField
                    floatingLabelText = "Places"
                    onChange = { this.handlePlacesChange } />
                  <AddPlace 
                    style = {{height: '35px', margin: "right", cursor: "pointer"}}
                    onClick = { this.handleAddPlace } />
                  <List>
                    {
                      this.state.currentPlaces.map( (place, index) => {
                        return <ListItem primaryText={ place } rightIcon={<RemovePlace />} onClick = { this.handlePlacesRemove } key = { index }/>
                      })
                    }
                  </List><br />
                </Paper>
                <Paper className = "Edit-additional" zDepth = {2} style = {{backgroundColor: 'azure'}}>
                  <h2> Additional </h2>
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
                </Paper>
              </form>
                { renderButtons() }
              </div>
            }
            </div>)
            : "Loading form for this trip..."
      }
      </div>
    )
  }
}

const mapStateToProps = ( { tripsReducer }, props ) => {
  const trip = Object.values(tripsReducer.trips).filter(trip => trip.id === props.match.params.tripId)[0]
  let arrayOfPlaces = [];
  if (trip !== undefined){
    trip.places.forEach(place => {
      arrayOfPlaces.push(place)
    })
  }
  return({
    trip,
    // currentPlaces: arrayOfPlaces
  })
}
export default connect(mapStateToProps)(withRouter(EditTrip))