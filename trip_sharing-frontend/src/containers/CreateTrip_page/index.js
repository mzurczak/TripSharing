import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'moment'

import AddPlace from 'material-ui/svg-icons/maps/add-location';
import DatePicker from 'material-ui/DatePicker';
import {List, ListItem} from 'material-ui/List';
import RemovePlace from 'material-ui/svg-icons/navigation/cancel'
import Save from 'material-ui/svg-icons/content/save';
import TextField from 'material-ui/TextField';

import './index.css'

import Header from '../../components/Header';
import { fetchCreateTrip } from '../../utils/fetch_functions';

class CreateTrip extends Component {
  
  constructor () {
    super();

    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear());
    currentDate.setHours(0, 0, 0, 0);
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear());
    minDate.setHours(0, 0, 0, 0);

    this.state = {
      title: null,
      description: null,
      startDate: null,
      endDate: null,
      places: [],
      newPlace: '',
      transportation: null,
      photo: null,
      budget: null,
      currentPlaces: [],
      
      currentDate,
      minDate
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

  handleAddPlace = () => {
    let newPlacesToChange = this.state.places;
    let newCurrentPlaces = [...this.state.currentPlaces];
    let place = this.state.newPlace;
    if(!newPlacesToChange.includes(place)){
      newPlacesToChange.push(place);
      newCurrentPlaces.push(place)
    } 
    this.setState({
      newPlace: '',
      currentPlaces: newCurrentPlaces,
      places: newPlacesToChange,
    })
  }
 
  handlePlacesRemove = (place) => {
    console.log(place)
    let newPlacesToChange = [...this.state.places];
    let newCurrentPlaces = [...this.state.currentPlaces]
    if(!newPlacesToChange.includes(place)){
      newPlacesToChange.push(place)
    } else {
      newPlacesToChange = newPlacesToChange.filter( placeFromArray => placeFromArray !== place)
    }
    newCurrentPlaces = newCurrentPlaces.filter(placeFromState => placeFromState !== place) 
    this.setState({
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

  handleCreate = (e) => {
    e.preventDefault();
    let newTrip = { 
      name: this.state.title,
      description: this.state.description,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      places: this.state.places,
      transportation: this.state.transportation, 
      photo: this.state.photo, 
      budget: this.state.budget 
    }
    console.log(newTrip);
    this.props.dispatch(fetchCreateTrip(newTrip))
    .then(() => {
        this.setState({})
        this.props.history.push(`/mytrips`)
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
      if (this.state.title !== null && this.state.description !== null){
        return (
          <div>
            <Save onClick = { this.handleCreate } className="material-icons" style = {{cursor: "pointer"}} />
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
            <div>
              <form>
                <TextField
                  floatingLabelText = "Name"
                  onChange = { this.handleNameChange }
                /><br />
                <div>
                  <DatePicker
                    onChange = { this.handleStartDate }
                    floatingLabelText = "Start date"
                    autoOk = { true }
                    shouldDisableDate={this.disableStartDays}
                  /><br />
                  <DatePicker
                    onChange = { this.handleEndDate }
                    floatingLabelText = "End date"
                    autoOk = { true }
                    shouldDisableDate={this.disableEndDays}
                  /><br />
                </div>
                <TextField
                  fullWidth = { true }
                  multiLine= { true }
                  rows= { 5 }
                  floatingLabelText = "Description"
                  onChange = { this.handleDescriptionChange }
                /><br />
                <div className = "Create-places">
                  <TextField
                      floatingLabelText = "Places"
                      defaultValue = { this.state.newPlace }
                      onChange = { this.handlePlacesChange } />
                  <AddPlace 
                  style = {{height: '35px', margin: "right", cursor: "pointer"}}
                  onClick = { this.handleAddPlace } />
                  <List>
                  {
                    this.state.currentPlaces.map( (place, index) => {
                      return <ListItem primaryText={ place } rightIcon={<RemovePlace onClick = { this.handlePlacesRemove }/>} key = { index }/>
                    })
                  }
                  </List>
                  <br />
                </div>
                <div>
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
                </div>
              </form>
              { renderButtons() }
            </div>
          }
        </div>
      </div>
    )
  }
}

export default connect()(withRouter(CreateTrip))