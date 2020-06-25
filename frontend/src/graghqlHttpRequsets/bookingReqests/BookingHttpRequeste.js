import axios from 'axios';


const BookingHttpRequeste = async (requseBody, token) => {
    return axios({
        url: 'http://localhost:8000/graphql',
        method: 'POST',
        data: requseBody,
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}
 
export default  BookingHttpRequeste ;
