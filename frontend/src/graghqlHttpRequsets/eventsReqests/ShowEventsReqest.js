import axios from 'axios';


const ShowEventsReqest = async (requseBody) => {
    return axios({
        url: process.env.REACT_APP_BACKEND_URL,
        method: 'POST',
        data: requseBody,
    })
}

export default ShowEventsReqest;
