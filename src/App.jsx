import { Navigate, Route, Routes } from "react-router-dom";
import Game from "./views/card/Game";
import Cards from "./views/card/Cards";
import Auth from "./views/auth/Auth";
import MainLayout from "./views/layout/MainLayout";
import Home from "./views/home/Home";
import Profil from "./views/profil/Profil";
import { useState } from "react";
import Sell from "./views/card/Sell";
import FormSell from "./views/sell/FormSell";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [modalOpen, setModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Auth setToken={setToken} />} />
      <Route
        element={
          <MainLayout
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            setSearchResults={setSearchResults}
          />
        }
      >
        <Route
          path="/jeux/:id"
          element={<Game searchResults={searchResults} />}
        />
        <Route
          path="/set/:id/cartes"
          element={<Cards searchResults={searchResults} />}
        />
        <Route path="boutique/:id" element={<Sell />} />
        {/* Routes protégées début */}
        <Route
          path="/vendre-mes-cartes"
          element={token ? <FormSell /> : <Navigate to="/login" />}
        />
        <Route
          path="/profil"
          element={
            token ? (
              <Profil setModalOpen={setModalOpen} />
            ) : (
              <Navigate to="/login" />
            )
          }
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
