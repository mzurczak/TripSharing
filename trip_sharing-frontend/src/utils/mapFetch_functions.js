import { addCoordinates, clearCurrentCoordinates } from "../store/actions_creators"

export const fetchCoordinates = (places) => (dispatch) =>{
  const apiKey = 'AIzaSyAtZmX6xZzKxK8oYR1LyJT8CexxG4-m0sA'
  places.forEach( address => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const coordinates = data.results[0].geometry.location;
        dispatch(addCoordinates(coordinates))
    })
  })
}

export const clearCoordinates = () => (dispatch) => {
  dispatch(clearCurrentCoordinates())
}