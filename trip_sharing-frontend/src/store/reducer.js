import { combineReducers } from 'redux'

const userInitialState = {
  token: '',
}

const userReducer = (state=userInitialState, action) => {
  switch (action.type) {
    case 'addUser':{
      return {
        token: action.token,
        userInfo: action.user
      }
    }

    case 'logOutUser': {
      return {
        token:null,
        user: {}
      }
    }

    case 'addToken': {
      return {
        token: action.token,
      };
    }

    case 'addSpecificUser':{
      const newState = { ...state }
      newState.specificUser = action.user;
      return newState;
    }

    default:
      return state;
  }
}

const tripsInitialState = {
  trips: { 
    
   }
}

const tripsReducer = (state = tripsInitialState, action) => {

  switch ( action.type ) {
    case 'addTrips' :{
      return {
        trips:  action.trips
      }
    }
    default :{
      return state;
    }
  }
}

const coordinatesInitialState = {
  coordinates: [{
  }]
}

const coordinatesReducer = (state = coordinatesInitialState, action) => {
  
  switch ( action.type ) {
    case 'addCoordinates' :{
      let newState = { ...state };
      newState.coordinates.push(action.coordinates);
      return {
        coordinates: newState.coordinates
      }
    }

    case 'clear' : {
      return {
        coordinates: [{
          lat: 47.390960,
          lng: 8.516318
        }]
      }
    }

    default :{
      return state;
    }
  }
}

const tripSharingReducer = combineReducers({
  tripsReducer,
  userReducer,
  coordinatesReducer
})

export default tripSharingReducer;