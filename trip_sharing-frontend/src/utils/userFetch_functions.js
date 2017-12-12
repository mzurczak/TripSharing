import { addToken, addUser, addSpecificUser } from "../store/actions_creators"

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
    });        
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

export const fetchSpecificUser = (userId) => (dispatch) => {
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

    return fetch(`http://localhost:8080/api/users/${userId}`, config)
      .then(res  => res.json())
      .then( data => {
        const action = addSpecificUser(data);
        dispatch(action)
      })
  }
}

export const fetchNewReview = (review) => (dispatch) => {
  const tokenJSON = localStorage.getItem('token');
  const token = JSON.parse(tokenJSON);
  if (token){
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ token }`
    });
    const newReview = {
      text: review.review,
      rating: review.rating
    }
  
    const config = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(newReview)
    }
  
    const url = `http://localhost:8080/api/users/${review.userId}/reviews/new`
    return fetch(url, config);
  }
}

export const fetchDeleteReview = ( userId, reviewId ) => () => {
  const tokenJSON = localStorage.getItem('token');
  const token = JSON.parse(tokenJSON);
  if (token){
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ token }`,
    });
    
    const config = {
      method: "DELETE",
      headers: myHeaders,
    }

    return fetch(`http://localhost:8080/api/users/${userId}/reviews/${reviewId}`, config)
  }
}