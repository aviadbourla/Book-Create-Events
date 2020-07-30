import axios from 'axios';


const BookingHttpRequeste = async (requseBody, token) => {
    return axios({
        url: process.env.REACT_APP_BACKEND_URL,
        method: 'POST',
        data: requseBody,
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}

export default BookingHttpRequeste;
