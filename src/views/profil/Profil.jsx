import React from 'react'
import { useState, useEffect } from 'react'
import { api } from '../auth/AuthService';
// import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";

const Profil = () => {
    const [token, setToken] = useState()

    const getToken = async () => {
        const localToken = await localStorage.getItem('token');

        if(localToken) setToken(localToken);
        
    }
    useEffect(() => {
        getToken()
    }, [])

    const userId = localStorage.getItem('user');
    if(userId) {
        api.get( `/api/users/${userId}`)
        .then((res) => {

        })
        .catch((err) => {
            console.log(err)
        })
    }

    return ( 
        <>
            {token && (
                <div>
                    <h1>Mon profil</h1>
                    <div style={styles.profilePicContainer}>
                        <img src={require('../../assets/img/pikachu2.png')} alt="" style={styles.profilePicture}/>
                    </div>
                </div>
            )}
        </>
    )
}

const styles = {
    profilePicContainer: {
        borderRadius: '50%',
        backgroundColor: '#636AF2',
        width: '80px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    profilePicture: {
        width: '50px',
    }
}

export default Profil