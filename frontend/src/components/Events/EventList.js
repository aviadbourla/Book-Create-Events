import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";
import './eventList.css';



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


const EventList = (props,) => {
    let history = useHistory();

    const bookEventHandler = (id) => {
        if (!props.loged) {
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
            const token = props.curToken;
            fetch('http://localhost:8000/graphql', {
                method: 'POST',
                body: JSON.stringify(requseBody),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(res => {
                    if (res.status !== 200 && res.status !== 201) {
                        throw new Error("failed")
                    }
                    return res.json();
                })
                .then(resData => {
                    history.push("/bookings");

                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    return (
        <TableContainer className="Events_table" component={Paper} >
            <Table aria-label="simple table">
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
                        <TableRow key={event._id} className="table_row">
                            <TableCell className="cell" align="right">
                                <button className="btn_book_event" onClick={() => bookEventHandler(event._id)}> הרשם לאירוע</button>
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

export default connect(mapStateToProps)(EventList);


