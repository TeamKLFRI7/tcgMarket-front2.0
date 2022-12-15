import {useEffect, useState} from "react";
import axios from 'axios';

let baseUrl = 'http://127.0.0.1:8000/api';

const getSeries = () => {
    axios.get(baseUrl + '/card_series?page=1')
    .then(function(response) {
        //console.log(response.data['hydra:member']);
    })
    .catch(function(error) {
        console.log(error);
    })
}

getSeries();

export let useGetCards = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const {data: response} = await  axios.get(baseUrl + '/card_sets/1');
                setData(response);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    return {
        data,
        loading,
    };
};