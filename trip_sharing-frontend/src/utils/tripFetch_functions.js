import { addTrips } from "../store/actions_creators"

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
  const trips = {};

  const config = {
    method: "GET",
    headers: myHeaders,
  }
  const url = `http://localhost:8080/api/trips/searchName?name=${searchItem}`
  return fetch(url, config)
  .then(res => res.json())
  .then(data => {
    data.forEach( trip => {
      trips[trip.id] = trip;
    });
    console.log(trips);
    dispatch(addTrips(trips))
  })
  // .then( () => {
  //   const url2 = `http://localhost:8080/api/trips/searchPlace?place=${searchItem}`;
  //   fetch(url2, config)
  //   .then(res => res.json())
  //   .then(data => {
  //     data.forEach( trip => {
  //       if (!trips[trip.id]) {
  //         trips[trip.id] = trip;
  //       }
  //     });
  //     console.log(trips);
  //     dispatch(addTrips(trips));
  //     })
  //   })
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
      const trips = {}
      trips[data.id] = {...data};
      dispatch(addTrips(trips));
  })
}

export const fetchEditTrip = (trip) => (dispatch) => {
  const tokenJSON = localStorage.getItem('token');
  const token = JSON.parse(tokenJSON);
  if (token){
      const myHeaders = new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ token }`
        });

    const config = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(trip)
    }
    const url = `http://localhost:8080/api/trips/${trip.id}`
    return fetch(url, config)
      .then(res => res.json())
      .then(data => {
        const trips = {}
        trips[data.id] = {...data};
        dispatch(addTrips(trips));
    })
  }
}

export const fetchCreateTrip = (trip) => (dispatch) => {
  const tokenJSON = localStorage.getItem('token');
  const token = JSON.parse(tokenJSON);
  if (token){
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ token }`
    });

    const config = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(trip)
    }
    const url = `http://localhost:8080/api/trips/create`
    return fetch(url, config)
    .then(res => res.json())
    .then(data => {
        const trips = {}
        trips[data.id] = {...data};
        dispatch(addTrips(trips));
    })
  }
}

export const fetchDeleteTrip = (tripId) => () => {
  const tokenJSON = localStorage.getItem('token');
  const token = JSON.parse(tokenJSON);
  if (token){
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ token }`
    });

    const config = {
      method: "DELETE",
      headers: myHeaders,
    }
    const url = `http://localhost:8080/api/trips/${tripId}`
    return fetch(url, config);
  }
}
