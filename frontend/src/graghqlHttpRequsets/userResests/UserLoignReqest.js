import axios from 'axios';


const UserLoignReqest = async(requseBody) => {
    return axios({
        url: 'http://localhost:8000/graphql',
        method: 'POST',
        data: requseBody,
    })
}

export default UserLoignReqest;
 