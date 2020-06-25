import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Auth from './pages/Auth';
import BookingPage from './pages/Booking';
import EvetnsPage from './pages/Events';
import MainNavigation from './components/Navigation/MainNavigation'
import { connect } from 'react-redux'
import CreatEventForm from './components/Events/CreatEventForm'
import HomePage from './pages/HomePage';
import './App.css';


function App(props) {
  return (
    <BrowserRouter >
      <React.Fragment>
        <MainNavigation />
        <main className="main-content">
          <Switch>
            {!props.loged && <Redirect from="/" to="/homepage" exact />}
            {!props.loged && <Redirect from="/" to="/auth" exact />}
            {!props.loged && <Redirect from="bookigns" to="/auth" exact />}
            {props.loged && <Redirect from="/" to="/events" exact />}
            {props.loged && <Redirect from="/auth" to="/events" exact />}
            {!props.loged && <Route path="/auth" component={Auth} />}
            <Route path="/homepage" component={HomePage} />
            <Route path="/createEvent" component={CreatEventForm} />
            <Route path="/events" component={EvetnsPage} />
            <Route path="/bookings" component={BookingPage} />
          </Switch>
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

