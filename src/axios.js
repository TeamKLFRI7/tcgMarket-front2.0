import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "./views/auth/AuthService";

let baseUrl = process.env.REACT_APP_URL_API;

// const getSeries = () => {
//   axios
//     .get(baseUrl + "/card_series?page=1")
//     .then((response) => {
//       // console.log(response.data['hydra:member']);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
//
// getSeries();

export let useGetCards = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          baseUrl + `/card_sets/${id}`
        );
        setData(response);
      } catch (error) {
        console.log(error);
        return error;
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  return {
    data,
    loading,
  };
};

export let useGetAllGames = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(baseUrl + "/games?page=1");
        setData(response);
      } catch (error) {
        return error;
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
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(baseUrl + `/games/${id}`);
        setData(response);
      } catch (error) {
        console.log(error);
        return error;
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  return {
    data,
    loading,
  };
};

export let useGetSell = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(baseUrl + `/cards/${id}`);
        setData(response);
      } catch (error) {
        console.log(error);
        return error;
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  return {
    data,
    loading,
  };
};

export let useGetUserMe = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("user");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await api.get(baseUrl + `/users/${userId}`);
        setData(response);
      } catch (error) {
        console.log(error);
        return error;
      }
      setLoading(false);
    };

    fetchData();
  }, [userId]);

  return {
    data,
    loading,
  };
};

export let useSearchCard = (name) => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (name.length > 2) {
        try {
          const response = await api.get(baseUrl + `/cards?name=${name}`);
          setData(response.data);
        } catch (error) {
          console.log(error);
          return error;
        }
      } else {
        setData(null);
      }
    };

    fetchData();
  }, [name]);

  return data;
};
