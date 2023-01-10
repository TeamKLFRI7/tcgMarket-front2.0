import { Routes, Route, BrowserRouter } from "react-router-dom";
import Game from "./views/home/Game";
import Cards from "./views/home/Cards";
import Menu from "./components/Menu";
import Auth from "./views/auth/Auth"
import MainLayout from "./views/layout/MainLayout";
import Home from "./views/home/Home";

function App() {
  return (
      <Routes>
        <Route path="/menu" element={<Menu/>} />
        <Route path="/login" element={<Auth/>} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home/>} />
          <Route path="/jeux/:id" element={<Game/>} />
          <Route path="/set/:id/cartes" element={<Cards/>} />
          <Route path="/ajouter-une-annonce" element={<p>Vendre une carte</p>} />
          <Route path="/profil" element={<p>Mon profil</p>} />
          <Route path="/mes-annonces" element={<p>Mes annonces</p>} />
          <Route path="/catalogue" element={<p>Catalogue de cartes</p>} />
          <Route path="set/:id/cartes" element={<Cards/>} />
          <Route path="/cartes-en-stock" element={<p>Cartes en stock (en vente)</p>} />
           {/* <Route element={<RequireAuth />}> */}
            <Route path="/ajouter-une-annonce" element={<p>Vendre une carte</p>} />
            <Route path="/profil" element={<p>Mon profil</p>} />
            <Route path="/mes-annonces" element={<p>Mes annonces</p>} />
           {/* </Route> */}
        </Route>
      </Routes>
  )
}

export default App
