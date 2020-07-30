import React, { useState } from "react";
import { connect } from 'react-redux'
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CreateEventReqest from '../../graghqlHttpRequsets/eventsReqests/CreateEventReqest'

import './creatEventForm.css'

function CreatEventForm(props) {
    const { register, errors, handleSubmit, watch } = useForm({});
    const [eror, SetEror] = useState('');
    const [isLogin, SetisLogin] = useState(true);
    let history = useHistory();

    const onSubmit = async (data) => {
        let requseBody = {
            query: `
            mutation {
                createEvent(evnetInput: {title: "${data.title}",price: ${+data.price} ,date: "${data.date}",description: "${data.description}"}){
                _id
                title
                description
                date
                price
            }
        }
         `
        };

        try {
            const token = props.curToken;
            const respone = await CreateEventReqest(requseBody, token);
            if (respone.status !== 200 && respone.status !== 201) {
                SetEror('username/password are wrong')
                throw new Error("failed")
            }
            props.onClose()
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form className="form_control_create_event" onSubmit={e => e.preventDefault()} >
                <h1 className="h1_addevent">
                    פרסום אירוע
                         </h1>
                <TextField
                    error={errors.title}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="נושא האירוע"
                    name="title"
                    autoComplete="title"
                    autoFocus
                    helperText={errors.title && errors.title.message}
                    floatingLabelFixed
                    inputRef={register({
                        required: "חובה להוסיף נושא",
                    })}
                />
                <TextField
                    error={errors.price}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="price"
                    label="מחיר"
                    type="price"
                    id="price"
                    helperText={errors.price && errors.price.message}
                    autoComplete="current-price"
                    inputRef={register({
                        required: "חובה להוסיף מחיר",
                    })}
                />


                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="date"
                    name="date"
                    type="datetime-local"
                    autoComplete="date"
                    autoFocus
                    inputRef={register({
                        required: "חובה להוסיף תאריך תקין",
                    })}
                />

                <TextField
                    error={errors.description}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    label="תיאור"
                    name="description"
                    autoComplete="description"
                    autoFocus
                    helperText={errors.description && errors.description.message}
                    inputRef={register({
                        required: "חובה להוסיף תיאור אירוע",
                    })}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit(onSubmit)}
                >
                    אישור
            </Button>


            </form>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        curToken: state.token,
        loged: state.connected
    };
};

export default connect(mapStateToProps)(CreatEventForm);


