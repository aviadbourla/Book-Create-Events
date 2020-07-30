import axios from 'axios';


const UserLoignReqest = async (requseBody) => {
    return axios({
        url: process.env.REACT_APP_BACKEND_URL,
        method: 'POST',
        data: requseBody,
    })
}

export default UserLoignReqest;
