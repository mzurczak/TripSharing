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
      }
    }

    case 'addToken': {
      return {
        token: action.token,
      };
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
        trips: action.trips
      }
    }
    default :{
      return state;
    }
  }
}

const coordinatesInitialState = {
  coordinates: {
    lat: 0,
    lng: 0
  }
}

const coordinatesReducer = (state = coordinatesInitialState, action) => {
  
  switch ( action.type ) {
    case 'addCoordinates' :{
      return {
        coordinates: action.coordinates
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