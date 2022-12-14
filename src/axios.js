import axios from 'axios';

let baseUrl = 'http://127.0.0.1:8008/api';

const getSeries = () => {
    axios.get(baseUrl + '/card_series?page=1')
    .then(function(response) {
        console.log(response.data['hydra:member']);
    })
    .catch(function(error) {
        console.log(error);
    })
}

getSeries();