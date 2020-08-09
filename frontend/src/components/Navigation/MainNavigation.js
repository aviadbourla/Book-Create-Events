import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import * as actions from '../../Redux/actions';
import './MainNavigation.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
const MainNavigation = (props) => {

    return (
        <Navbar expand="lg" className="main-nav">
            <Navbar.Brand className="main-navigation__logo">
                <NavLink
                    to="homepage"
                    className="main-navigation__logo" >
                    EasyEvent
                 </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse
                id="responsive-navbar-nav"
                className="main-navigation__item">
                <Nav className="mr-auto">
                    {!props.loged &&
                        <NavLink to="/auth" className="events">
                            Authenticate
                          </NavLink>
                    }
                    <NavLink
                        to="/events"
                        className="events">
                        Events
                     </NavLink>
                    {props.loged &&
                        <NavLink
                            to="/bookings"
                            className="events">
                            Bookings
                     </NavLink>
                    }
                </Nav>
                {props.loged &&
                    <NavLink
                        to="/auth"
                        className="events"
                        onClick={() => props.logout()}>
                        logout
                      </NavLink>
                }
                <a
                    className="links"
                    href="https://github.com/aviadbourla">
                    <GitHubIcon fontSize="large" color="inherit" />
                </a>
                <a
                    className="links"
                    href="https://www.linkedin.com/in/aviad-bourla-56b4351aa/">
                    <LinkedInIcon fontSize="large" color="inherit" />
                </a>
            </Navbar.Collapse >
        </Navbar >
    )
};

const mapStateToProps = (state) => {
    return {
        loged: state.connected,
        curToken: state.token,
        CuruserId: state.id
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigation);


