export const addToken = () => ({
  type: 'addToken',
  token: localStorage.getItem('token'),
})

export const addUser = (data) => ({
  type: 'addUser',
  token: localStorage.getItem('token'),
  user: data
})

export const addSpecificUser = (data) => ({
  type: 'addSpecificUser',
  token: localStorage.getItem('token'),
  user: data
})

export const logOut = () => ({
  type: 'logOutUser',
})

export const addTrips = (data) => ({
  type: 'addTrips',
  trips: data
})

export const addCoordinates = (data) => ({
  type: 'addCoordinates',
  coordinates: data
})

export const clearCurrentCoordinates = () => ({
  type: 'clear',
  coordinates: {}
})