
import React, { useState, useEffect } from 'react';
import './homepage.css'
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


const HomePage = () => {
    let history = useHistory();
    const classes = useStyles();

    const [date, SetDate] = useState(Date)
    const [month, SetMonth] = useState('')
    const [day, SetDay] = useState('')

    useEffect(() => {
        let d = new Date();
        SetMonth(getMonthText(d.getMonth() + 1));
        SetDay(d.getDay());
    }, [])

    const getMonthText = (a) => {
        let b;
        switch (a) {
            case 1: b = "January";
                return b;
            case 2: b = "February";
                return b;
            case 3: b = "March";
                return b;
            case 4: b = "April";
                return b;
            case 5: b = "May";
                return b;
            case 6: b = "June";
                return b;
            case 7: b = "July";
                return b;
            case 8: b = "August";
                return b;
            case 9: b = "September";
                return b;
            case 10: b = "October";
                return b;
            case 11: b = "November";
                return b;
            case 12: b = "December";
                return b;
        }
    }
    return (
        <div className="home_continer">
            <div className="first_div">
                <div className="continer">
                    <h1 className="home-title"> Simplify Book it </h1>
                    <p> {month} 2020 / Events</p>
                    <button className="btn-home" onClick={() => history.push("/events")}>   Book <strong> Events</strong> Now! </button>
                </div>
            </div>
            <div className="second_div">
                <div className="description_second_div">
                    <h1> Book events now.</h1>
                    <br />
                    <p className="text_second_div">
                        Book Event: Online Together is a web-app online conference that let
                        you focus on finding the right event for you in severl topics such as, UX/UI, cyber security, software development , and more, giving you deep
                        insights to make the right decision</p>
                </div>
            </div>

        </div >

    )
}

export default HomePage;