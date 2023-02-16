import { Routes, Route, Navigate } from "react-router-dom";
import Game from "./views/card/Game";
import Cards from "./views/card/Cards";
import Auth from "./views/auth/Auth";
import MainLayout from "./views/layout/MainLayout";
import Home from "./views/home/Home";
import Profil from "./views/profil/Profil";
import { useState } from "react";
import Sell from "./views/card/Sell";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Auth setToken={setToken}/>} />
      <Route element={<MainLayout modalOpen={modalOpen} setModalOpen={setModalOpen}/>}>
        <Route path="/jeux/:id" element={<Game />} />
        <Route path="/set/:id/cartes" element={<Cards />} />
        <Route path="boutique/:id" element={<Sell />} />
        {/* Routes protégées début */}
        <Route
          path="/ajouter-une-annonce"
          element={token ? <p>Vendre une carte</p> : <Navigate to="/login" />}
        />
        <Route
          path="/profil"
          element={token ? <Profil setModalOpen={setModalOpen}/> : <Navigate to="/login" />}
        />
        <Route
          path="/mes-annonces"
          element={token ? <p>Mes annonces</p> : <Navigate to="/login" />}
        />
        {/* Routes protégées fin */}
      </Route>
    </Routes>
  );
}

export default App;
