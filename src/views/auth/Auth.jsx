import React, { useState } from "react";
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";
import './Connexion.css'
import tcgLogo from "../../assets/img/logo-tcgMarket.png"
import pokemonImg from "../../assets/img/pkmn-img-dress.webp"

const Auth = () => {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className='connexion'>
        <img className='tcg-logo' src={tcgLogo} alt='pokemon'/>
        {
            currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
        }
        <img className='img-dresseurs' src={pokemonImg} alt='pokemon'/>
    </div>
  );
};


export default Auth;