import axios from 'axios';
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

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

export let useGetCards = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} = useParams()

    useEffect(() => {
        const fetchData = async() => {
            try {
                const {data: response} = await  axios.get(baseUrl + `/card_sets/${id}`);
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

export let useGetGame = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const {data: response} = await  axios.get(baseUrl + '/games/1');
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