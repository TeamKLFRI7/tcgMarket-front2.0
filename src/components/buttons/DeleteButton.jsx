import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './button.css';

const DeleteButton = props => {
    let apiUrl = process.env.REACT_APP_URL_API;
    const navigate = useNavigate();
    const [token, setToken] = useState()

    const getToken = async () => {
        const localToken = await localStorage.getItem('token');

        if(localToken) setToken(localToken);
        
    }
    useEffect(() => {
        getToken()
    }, [])

    const [apiError, setApiError] = useState(null);
    const handleDeleteUser = (id) => {
        if (id) {
            console.log(apiUrl + "/users/" + id)
            axios.delete(apiUrl + "/users/" + id, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": `application/json`,
                },
              })
                .then((res) => {
                    localStorage.removeItem('user')
                    localStorage.removeItem('token')
                    setApiError(null);
                    navigate('/login');
                })
                .catch((err) => {
                    console.log(err);
                    // if (err.response.data.code === 401) {
                    //     setApiError("Lidentifiant ou le mot de passe est invalide.");
                    // }
             });
        }
    };

    return (
        <>
            <button onClick={() => handleDeleteUser(props.path)} type={props.type} className='btn deleteBtn'>{props.children}</button>
        </>
    )
}

export default DeleteButton