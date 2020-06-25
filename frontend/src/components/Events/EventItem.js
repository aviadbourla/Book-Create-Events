
import React from 'react';
import { connect } from 'react-redux'
import './eventItem.css';

const EventItem = (props) => {
    return (
        <li className="event_li" key={props.eventId}>
            <div className="title_price_div">
                <p> {props.title}</p>
                <p> ${props.event.price} - {new Date(props.event.date).toLocaleDateString()}</p>
            </div>
            <div>
                {props.event.creator._id !== props.CuruserId ? <button className="btn_info"> Book Event</button> : <p>Your are the Owner of the event</p>}
            </div>
        </li>)
}

const mapStateToProps = (state) => {
    return {
        CuruserId: state.id
    };
};

export default connect(mapStateToProps)(EventItem);

