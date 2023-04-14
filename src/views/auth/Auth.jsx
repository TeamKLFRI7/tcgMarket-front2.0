import React, { useState } from "react";
import Login from "./Login";
import { Register } from "./Register";
import "./Connexion.css";
import tcgLogo from "../../assets/img/logo-tcgMarket.png";
import pokemonImg from "../../assets/img/pkmn-img-dress.webp";

const Auth = ({ setToken }) => {
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div className="connexion">
      <img className="tcg-logo" src={tcgLogo} alt="pokemon" />
      {currentForm === "login" ? (
        <Login onFormSwitch={toggleForm} setToken={setToken} />
      ) : (
        <Register onFormSwitch={toggleForm} setToken={setToken} />
      )}
      <img className="img-dresseurs" src={pokemonImg} alt="pokemon" />
    </div>
  );
};

export default Auth;
