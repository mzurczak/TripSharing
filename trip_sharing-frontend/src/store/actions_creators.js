export const addToken = () => ({
  type: 'addToken',
  token: localStorage.getItem('token'),
})

export const addUser = (data) => ({
  type: 'addUser',
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
