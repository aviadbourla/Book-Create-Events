import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ShowBookingHttpRequest from '../graghqlHttpRequsets/bookingReqests/ShowBookingHttpRequest'
import AlertDialog from './AlertDialog'
import './bookings.css'

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


const BookingPage = (props) => {

    const [bookingsArr, setBookigns] = useState([])
    const [isloading, setisloading] = useState(false)

    useEffect(() => {
        fetchBookings();
    }, [])

    const fetchBookings = async () => {
        setisloading(true);
        let requseBody = {
            query: `
            query {
                bookings{
                _id
                createdAt
                updatedAt
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
                    _id
                    email
                    fullName
                }
            }
        }
         `
        };

        try {
            const token = props.curToken;
            const respone = await ShowBookingHttpRequest(requseBody, token);
            if (respone.status !== 200 && respone.status !== 201) {
                throw new Error("failed")
            }
            const temp = respone.data.data.bookings;
            setBookigns(temp)
            setisloading(false);
        }
        catch (err) {
            console.log(err)
            setisloading(false);
        }
    }

    const CancelbookEventHandler = (id) => {
        if (!props.loged) {
            alert("you need to login first")
        } else {
            let requseBody = {
                query: `
                    mutation {
                        cancelBooking(bookingId: "${id}"){
                        _id
                        title
                    }
                }
                 `
            };
            const token = props.curToken;
            fetch(process.env.REACT_APP_BACKEND_URL, {
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
                    const filterdArr = bookingsArr.filter(booking => { return booking._id !== id })
                    setBookigns(filterdArr)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    return (
        < div className="main_continer_boking" >
            <div className="showEvents_continer_booking">
                {isloading ?
                    <div className="main_event_list">
                        <div className="spinner">
                            <div className="lds-dual-ring">
                            </div>
                        </div>
                    </div> :
                    bookingsArr.length < 1 ? <AlertDialog openDialog={true} /> :
                        <TableContainer className="Events_table" component={Paper} >
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow className="table_row_main_booking">
                                        <TableCell className="table_row_main_text_boking" align="right"></TableCell>
                                        <TableCell className="table_row_main_text_boking" align="right">אירוע בנושא</TableCell>
                                        <TableCell className="table_row_main_text_boking" align="right">שעה</TableCell>
                                        <TableCell className="table_row_main_text_boking" colSpan={6} align="right"> תאריך</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {bookingsArr.map((booking) => (
                                        <TableRow key={booking._id} className="table_row">
                                            <TableCell className="cell" align="right"><button className="btn_cancel" onClick={() => CancelbookEventHandler(booking._id)}>בטל הרשמה לאירוע</button></TableCell>
                                            <TableCell className="cell" align="right">{booking.event.title}</TableCell>
                                            <TableCell className="date_cell_houre" align="right">{new Date(booking.event.date).getHours() + ':' + new Date(booking.event.date).getMinutes()}</TableCell>
                                            <TableCell className="date_cell_houre" align="right">{getMonthText(new Date(booking.event.date).getMonth() + 1)}</TableCell>
                                            <TableCell className="date_cell_day" align="right">{new Date(booking.event.date).getDate()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>}
            </div>
        </div >
    );

}


const mapStateToProps = (state) => {
    return {
        curToken: state.token,
        loged: state.connected
    };
};

export default connect(mapStateToProps)(BookingPage);

