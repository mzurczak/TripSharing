import { addToken, addUser, addTrips } from "../store/actions_creators"

/***************************************
 * 
 * User-fetching functions 
 * 
 ***************************************/

export const fetchSignIn = (user) => (dispatch) => {
  const myHeaders = new Headers({
    'Content-Type': 'application/json'
  });
  
  const config = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(user)
  }
  
  return fetch('http://localhost:8080/api/users/sign_in', config)
  .then(res => res.json())
  .then(data => {
    if ((data.token !== null ) && (data.token !== undefined)) {
      const action = addToken(data);
      dispatch(action);
      localStorage.setItem('token', JSON.stringify(data.token))
    }
  })       
}

export const fetchNewUser = (user) => (dispatch) => {
  const myHeaders = new Headers({
    'Content-Type': 'application/json'
  });
  
  const config = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(user)
  }
  return fetch('http://localhost:8080/api/users/sign_up', config)
    .then(res => res.json())
    .then(data => {
      if ((data.token !== null )&& (data.token !== undefined)) {
        const action = addToken(data);
        dispatch(action);
      }
    })
    .then(() => dispatch(fetchSignIn(user)));        
}

export const fetchUser = () => (dispatch) => {
  const tokenJSON = localStorage.getItem('token');
  const token = JSON.parse(tokenJSON);
  if (token){
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ token }`
    });
      
    const config = {
      method: "GET",
      headers: myHeaders,
    }

    return fetch('http://localhost:8080/api/users/me', config)
      .then(res  => res.json())
      .then( data => {
        const action = addUser(data);
        dispatch(action)
      })
  }
}

/***************************************
 * 
 * Trip-fetching functions 
 * 
 ***************************************/

export const fetchAllTrips = () => (dispatch) => {
  const myHeaders = new Headers({
    'Content-Type': 'application/json'
  });

  const config = {
    method: "GET",
    headers: myHeaders,
  }

  const url = `http://localhost:8080/api/trips/`
  return fetch(url, config)
    .then(res => res.json())
    .then(data => {
      const trips = {};
      data.forEach( trip => {
        trips[trip.id] = trip;
      });
      dispatch(addTrips(trips));
  })
}

export const fetchSearching = (searchItem) => (dispatch) => {
  const myHeaders = new Headers({
    'Content-Type': 'application/json'
  });

  const config = {
    method: "GET",
    headers: myHeaders,
  }

  const url = `http://localhost:8080/api/trips/searchName?name=${searchItem}`
  return fetch(url, config)
    .then(res => res.json())
    .then(data => {
      const trips = {};
      data.forEach( trip => {
        trips[trip.id] = trip;
      });
      dispatch(addTrips(trips));
  })
}

export const fetchSpecificTrip = (tripId) => (dispatch) => {
  const myHeaders = new Headers({
    'Content-Type': 'application/json'
  });

  const config = {
    method: "GET",
    headers: myHeaders,
  }

  const url = `http://localhost:8080/api/trips/${tripId}`
  return fetch(url, config)
    .then(res => res.json())
    .then(data => {
      const trips = {...data};
      dispatch(addTrips(trips));
  })
}