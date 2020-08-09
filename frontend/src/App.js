import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Auth from './pages/Auth';
import BookingPage from './pages/Booking';
import EvetnsPage from './components/Events/EvetnsPage';
import MainNavigation from './components/Navigation/MainNavigation'
import { connect } from 'react-redux'
import CreatEventForm from './components/Events/CreatEventForm'
import HomePage from './pages/HomePage';
import SignUpForm from './pages/SignUpForm';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App(props) {

  let routes;

  if (!props.loged) {
    routes =
      <Switch>
        <Route path="/homepage">
          <HomePage />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/events">
          <EvetnsPage />
        </Route>
        <Redirect to="/auth" />
      </Switch>
  } else {
    routes =
      <Switch>
        <Route path="/homepage">
          <HomePage />
        </Route>
        <Route path="/bookings">
          <BookingPage />
        </Route>
        <Route path="/events"  >
          <EvetnsPage />
        </Route>
        <Redirect to="/events" />
      </Switch>
  }

  return (
    <BrowserRouter >
      <React.Fragment>
        <MainNavigation />
        <main >
          {routes}
        </main>
      </React.Fragment>
    </BrowserRouter >
  );
}

const mapStateToProps = (state) => {
  return {
    loged: state.connected,
    curToken: state.token,
    CuruserId: state.id
  };
};

export default connect(mapStateToProps)(App);

