import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Store from './store';

import './index.css';

import CreateTripPage from './containers/CreateTrip_page'
import EditTripPage from './containers/EditTrip_page'
import Home from './components/Home_page';
import SearchPage from './components/Search_page';
import TripPage from './containers/Trip_page';
import UserTripsPage from './containers/UserTrips_page'
import { fetchUser } from './utils/fetch_functions';

Store.dispatch(fetchUser());

ReactDOM.render(
  <Provider store = { Store }>
    <MuiThemeProvider>
      <Router>
        <Switch>
          <Route exact path = {'/'} component = { Home } />
          <Route exact path = {'/search/:searchTrip'} component = { SearchPage } />
          <Route exact path = {'/trips/:tripId'} component = { TripPage } />
          <Route exact path = {'/trip/create'} component = { CreateTripPage } />
          <Route exact path = {'/trips/edit/:tripId'} component = { EditTripPage } />
          <Route exact path = {'/mytrips'} component = { UserTripsPage } />
        </Switch>
      </Router>
    </MuiThemeProvider>
  </Provider>, 
document.getElementById('root'));
registerServiceWorker();
