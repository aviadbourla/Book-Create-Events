import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import SearchIcon from '@material-ui/icons/Search';
import CustimizedDialog from '../Dialogs/CustimizedDialog';
import CollapsibleTable from './CollapsibleTable'
import CollapsibleTableBookingTracking from './CollapsibleTableBookingTracking'
import { Button } from '@material-ui/core';
import ShowEventsReqest from '../../graghqlHttpRequsets/eventsReqests/ShowEventsReqest'
import BookingHttpRequeste from '../../graghqlHttpRequsets/bookingReqests/BookingHttpRequeste'
import Grid from '@material-ui/core/Grid';

import './creatEvent.css';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const EvetnsPage = (props) => {
    const [events, setEvents] = useState([]);
    const [bookings, setBookigns] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [creating, setCreating] = useState(false);
    const [myEvents, setMyEvents] = useState(false);
    const [filter, setFilter] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [eror, SetEror] = useState('');
    const classes = useStyles();

    useEffect(() => {
        fetchEvents();
    }, [])

    useEffect(() => {
        fetchBookings();
    }, [])

    const fetchEvents = async () => {
        setIsLoading(true);
        let requseBody = {
            query: `
            query {
                events{
                _id
                title
                description
                date
                price
                creator{
                    _id
                    email
                    fullName
                }
            }
        }
         `
        };
        try {
            const respone = await ShowEventsReqest(requseBody);
            if (respone.status !== 200 && respone.status !== 201) {
                SetEror('username/password are wrong')
                throw new Error("failed")
            }
            const temp = respone.data.data.events;
            setEvents(temp)
            setIsLoading(false);
        }
        catch (error) {
            console.log(error)
            setIsLoading(false);
        }
    }

    const fetchBookings = async () => {
        let requseBody = {
            query: `
            query {
                Allbookings{
                _id
                event{
                     title
                     date
                     creator{
                        _id
                        email
                        fullName 
                    }
                } 
                user{
                    email
                    _id
                    fullName
                }
            }
        }
         `
        };

        try {
            const token = props.curToken;
            const respone = await BookingHttpRequeste(requseBody, token);
            if (respone.status !== 200 && respone.status !== 201) {
                throw new Error("failed")
            }
            const temp = respone.data.data.Allbookings;
            setBookigns(temp)
        }
        catch (err) {
            console.log(err)
        }
    }

    const dateNow = new Date().toISOString()
    const filteredAdmin = events.filter(event => { return event.creator._id === props.userId })
    const filteredAdminUserBooking = bookings.filter(booking => { return booking.event.creator._id === props.userId })
    const filteredArr = events.filter(event => (event.title.includes(filter) && (event.date > dateNow))).sort((a, b) => new Date(a.date) - new Date(b.date))
    const filteredArrByDate = events.filter(event => event.date > filterDate && (event.date > dateNow)).sort((a, b) => new Date(a.date) - new Date(b.date))

    return (
        <div className="background">
            <div className={classes.root}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item xs={12} sm={6}  >
                        <div className="showEvents_continer_main">
                            <header className="header">
                                <div className="search_color_main">
                                    <div className="filter_continer">
                                        <div className="search">
                                            <button className="btn_icon"><SearchIcon /> </button>
                                            <input className="search_input" type="text" placeholder="חיפוש" onChange={(e) => setFilter(e.target.value)} />
                                        </div>
                                        <div className="date_title_continer">
                                            <input className="date_title_input" type="text" placeholder="אירוע בנושא" onChange={(e) => setFilter(e.target.value)} />
                                            <input className="date_title_input" type="date" placeholder="date" onChange={(e) => setFilterDate(e.target.value)} />
                                        </div>
                                        <p className="p_date"> * מציג אירועים החל מהתאריך הנבחר  </p>

                                    </div>
                                </div>
                            </header>
                            <div className="showEvents_continer">
                                {props.loged &&
                                    <div className="addEvents">
                                        <button className="addEvent_btn">
                                            <CustimizedDialog />
                                        </button>
                                        <p className="events_number">
                                            {myEvents ? "אירועים" + " " + filteredAdmin.length : "אירועים" + " " + events.length}
                                        </p>
                                        <button className="addEvent_btn"
                                            onClick={() => setMyEvents(!myEvents)}>
                                            <Button>
                                                {myEvents ? 'הצג כלל האירועים' : 'הצג אירועים שלי'}
                                            </Button>
                                        </button>
                                    </div>
                                }
                                {myEvents
                                    ?
                                    <CollapsibleTableBookingTracking
                                        events={filteredAdmin}
                                        bookedEvents={filteredAdminUserBooking}
                                    />
                                    :
                                    isloading ?
                                        <div className="spiner-continer">
                                            <div className="spinner">
                                                <div className="lds-dual-ring">
                                                </div>
                                            </div>
                                        </div>
                                        : filter !== '' ?
                                            <CollapsibleTable
                                                events={filteredArr} />
                                            :
                                            <CollapsibleTable
                                                events={filteredArrByDate}
                                            />
                                }
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>

        </div >
    );
}

const mapStateToProps = (state) => {
    return {
        curToken: state.token,
        loged: state.connected,
        userId: state.id
    };
};

export default connect(mapStateToProps)(EvetnsPage);



{/* {isloading ? <div className="spinner"> <div className="lds-dual-ring"></div> </div> : filter !== '' ? <EventList events={filteredArr}  /> :   <EventList events={filteredArrByDate}/>  } */ }