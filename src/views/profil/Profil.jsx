import React from 'react'
import { useState, useEffect } from 'react'

const Profil = () => {
    const [token, setToken] = useState()
    const getToken = async () => {
        const localToken = await localStorage.getItem('token');
        console.log(localToken)
        if(localToken) setToken(localToken)
    }
    useEffect(() => {
        getToken()
    }, [])

    return ( 
        <>
            <p>Nothing</p>
            {token && (
                <div>Profil</div>
            )}
        </>
    )
}

export default Profil