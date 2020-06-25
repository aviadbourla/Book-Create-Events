import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import './eventList.css';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import BookingHttpRequeste from '../../graghqlHttpRequsets/userResests/UserLoignReqest'

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

const getMonthText = (a) => {
    let b;
    switch (a) {
        case 1: b = "ינואר";
            return b;
        case 2: b = "פבואר";
            return b;
        case 3: b = "מרץ";
            return b;
        case 4: b = "אפריל";
            return b;
        case 5: b = "מאי";
            return b;
        case 6: b = "יוני";
            return b;
        case 7: b = "יולי";
            return b;
        case 8: b = "אוגוסט";
            return b;
        case 9: b = "ספטמבר";
            return b;
        case 10: b = "אוקטובר";
            return b;
        case 11: b = "נובמבר";
            return b;
        case 12: b = "דצמבר";
            return b;
    }
}

function Row(props) {

    const [filter, setFilter] = useState('');
    const [open, setOpen] = React.useState(false);

    let history = useHistory();

    const bookEventHandler = async (id) => {
        if (!props.connect) {
            history.push("/auth");
        } else {
            let requseBody = {
                query: `
                    mutation {
                        bookEvent(eventId: "${id}"){
                        _id
                        createdAt
                        updatedAt
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
                history.push("/bookings");
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    const { event } = props;
    const filteredArr = props.bookedEvents.filter(event => event.user.fullName.includes(filter));
    
    const classes = useRowStyles();
    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell className="cell" align="right">
                    {event.title}
                </TableCell>
                <TableCell className="date_cell_houre" align="right">
                    {new Date(event.date).getHours() + ':' + new Date(event.date).getMinutes()}
                </TableCell>
                <TableCell className="date_cell_houre" align="right">
                    {getMonthText(new Date(event.date).getMonth() + 1)}
                </TableCell>
                <TableCell className="date_cell_day" align="right">
                    {new Date(event.date).getDate()}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                מידע על הנרשמים
                            </Typography>
                            <div className="filer_continer">
                                <input className="booked_events_input_filter" type="text" placeholder="סנן לפי שם" onChange={(e) => setFilter(e.target.value)} />
                                <p className="number_booked_p"> סך הכל נרשמו : {props.bookedEvents.length}</p>
                            </div>

                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right"> מייל ליצירת קשר</TableCell>
                                        <TableCell align="right">שם לקוח</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredArr.map((bookedEvent) => (
                                        <TableRow key={bookedEvent._id}>
                                            <TableCell className="cell_email" >
                                                {bookedEvent.user.email}
                                            </TableCell>
                                            <TableCell className="cell_email" >
                                                {bookedEvent.user.fullName}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>

                            </Table>

                            <div className="description_continer">
                                <p>{event.description}</p>
                            </div>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function CollapsibleTableBookingTracking(props) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow className="table_row_main">
                        <TableCell className="table_row_main_text" align="right"></TableCell>
                        <TableCell className="table_row_main_text" align="right">אירוע בנושא</TableCell>
                        <TableCell className="table_row_main_text" align="right">שעה</TableCell>
                        <TableCell className="table_row_main_text" colSpan={6} align="right"> תאריך</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.events.map((event) => (
                        <Row key={event._id} event={event} events={props.events} bookedEvents={props.bookedEvents} connect={props.loged} curToken={props.curToken} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const mapStateToProps = (state) => {
    return {
        curToken: state.token,
        loged: state.connected
    };
};

export default connect(mapStateToProps)(CollapsibleTableBookingTracking);
