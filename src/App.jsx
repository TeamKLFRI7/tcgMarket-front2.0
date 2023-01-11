import { Routes, Route, Navigate } from "react-router-dom";
import Game from "./views/home/Game";
import Cards from "./views/home/Cards";
import Menu from "./components/Menu";
import Auth from "./views/auth/Auth"
import MainLayout from "./views/layout/MainLayout";
import Home from "./views/home/Home";
import Profil from "./views/profil/Profil";
import { useEffect, useState } from "react";

function App() {
  // const token = localStorage.getItem('token')
  const [token, setToken] = useState(localStorage.getItem('token'))
  console.log(token);


  return (
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/menu" element={<Menu/>} />
        <Route path="/login" element={<Auth setToken={setToken}/>} />
        <Route element={<MainLayout />}>
          <Route path="/jeux/:id" element={<Game/>} />
          <Route path="/set/:id/cartes" element={<Cards/>} />
          <Route path="/catalogue" element={<p>Catalogue de cartes</p>} />
          <Route path="set/:id/cartes" element={<Cards/>} />
          <Route path="/cartes-en-stock" element={<p>Cartes en stock (en vente)</p>} />
          {/* Routes protégées début */}
            <Route path="/ajouter-une-annonce" element={token ? <p>Vendre une carte</p> : <Navigate to="/login"/>}/>
            <Route path="/profil" element={token ? <Profil/> : <Navigate to="/login"/>} />
            <Route path="/mes-annonces" element={token ? <p>Mes annonces</p> : <Navigate to="/login"/>} />
          {/* Routes protégées fin */}
        </Route>
      </Routes>
  )
}

export default App

