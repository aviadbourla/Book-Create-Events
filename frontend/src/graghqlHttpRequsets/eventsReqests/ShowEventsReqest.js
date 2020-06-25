import axios from 'axios';


const ShowEventsReqest = async (requseBody) => {
    return axios({
        url: 'http://localhost:8000/graphql',
        method: 'POST',
        data: requseBody,
    })
}
 
export default ShowEventsReqest ;
