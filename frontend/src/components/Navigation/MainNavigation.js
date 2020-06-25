import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import * as actions from '../../Redux/actions';
import './MainNavigation.css'


const MainNavigation = (props) => {
    return (
        <header className="main-navigation">
            <NavLink className="main-navigation__logo" to="/"  > EasyEvent</NavLink>
            <nav className="main-navigation__item">
                <ul>
                    {/* {!props.loged && <li>{}</li>} */}
                    {!props.loged && <li  > <NavLink to="/auth" className="auth">Authenticate  </NavLink></li>}
                    <li> <NavLink to="/events"  >Events  </NavLink></li>
                    {props.loged && <li> <NavLink to="/bookings" className="events"> Bookings</NavLink></li>}
                    {props.loged && <li> <NavLink to="/auth" className="events" onClick={() => props.logout()}> logout</NavLink></li>}
                </ul>
            </nav>
        </header>)
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


