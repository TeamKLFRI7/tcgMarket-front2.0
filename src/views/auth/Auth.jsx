import React, { useState } from "react";
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";
import './Connexion.css'

const Auth = () => {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className='connexion'>
        <img className='tcg-logo' src='./fixtures/logo-tcgMarket.png' alt='pokemon'/>
        {
            currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
        }
        <img className='img-dresseurs' src='./fixtures/pkmn-img-dress.webp' alt='pokemon'/>
    </div>
  );
};


export default Auth;