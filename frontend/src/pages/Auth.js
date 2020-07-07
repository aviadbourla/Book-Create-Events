import React, { useState, useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { connect } from 'react-redux'
import * as actions from '../Redux/actions';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import UserLoignReqest from '../graghqlHttpRequsets/userResests/UserLoignReqest';
import "./Auth.css";

const Auth = (props) => {

    const { register, errors, handleSubmit, watch } = useForm({});
    const [isLogin, SetisLogin] = useState(true);
    const [eror, SetEror] = useState('');

    let history = useHistory();

    const password = useRef({});
    password.current = watch("password", "");


    const SwtichModeHandler = () => {
        SetisLogin(!isLogin);
    }

    const onSubmit = async (data) => {
        let requseBody = {
            query: `
            query{
                login(email: "${data.email}", password: "${data.password}}") {
                    userId
                    token
                    toeknExpiration
                }
            }
            `
        };

        if (!isLogin) {
            requseBody = {
                query: `
                mutation {
                    creatUser(userInput: {email: "${data.email}",password: "${data.password}}" ,fullName: "${data.fullName}"}){
                        _id
                        email
                    }
                }
                 `
            };
        }

        try {
            const respone = await UserLoignReqest(requseBody);
            if (respone.status !== 200 && respone.status !== 201) {
                SetEror('username/password are wrong')
                throw new Error("failed")
            }
            props.login();
            props.getToken(respone.data.data.login.token);
            props.getUserId(respone.data.data.login.userId);
            history.push("/events");
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="login_continer">
            <form className="form_control" onSubmit={e => e.preventDefault()} >
                <div className="icon_h1">
                    <h1 className="login_h1">
                        {isLogin ? 'Log in' : 'Sign Up'}
                    </h1>
                    <Avatar  >
                        <LockOutlinedIcon />
                    </Avatar>
                </div>
                {!isLogin
                    && <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="fullName"
                        label="full Name"
                        name="fullName"
                        autoComplete="fullName"
                        autoFocus
                        error={errors.fullName}
                        inputRef={register({
                            required: "You must specify a fullName",
                        })}
                    />}
                {(errors.fullName && isLogin) && errors.fullName.message}

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    helperText={errors.email && errors.email.message}
                    error={errors.email}
                    inputRef={register({
                        required: "חובה להוסיף מייל תקין",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "מייל לא תקין נסה שנית"
                        }
                    })}
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    helperText={errors.password && errors.password.message}
                    error={errors.password}
                    autoComplete="current-password"
                    inputRef={register({
                        required: "חובה להוסיף ססמא",
                        minLength: {
                            value: 4,
                            message: "ססמא חייבת להכיל לפחות 4 תווים"
                        }
                    })}
                />


                {/* <p > {eror}  </p> */}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit(onSubmit)}

                >
                    {isLogin ? 'Log in' : 'Sign Up'}
                </Button>
                <Grid container>
                    <Grid item>
                        <Button onClick={() => SwtichModeHandler()} variant="body2">
                            {isLogin ? "Don't have an account? Sign Up" : "Have account? Switch to login"}
                        </Button>
                    </Grid>
                </Grid>

            </form>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        loged: state.connected,
        curToken: state.token,
        CuruserId: state.id,
        fullName: state.fullName
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: () => dispatch(actions.login()),
        logout: () => dispatch(actions.logout()),
        getToken: (token) => dispatch(actions.getToken(token)),
        getUserId: (id) => dispatch(actions.getUserId(id)),
        getUserFullName: (fullName) => dispatch(actions.getUserFullName(fullName)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
