import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./views/home/Home";
import Cards from "./views/home/Cards";
import Menu from "./views/components/Menu";
import Auth from "./views/auth/Auth"
import MainLayout from "./views/layout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/menu" element={<Menu/>} />
        <Route path="/login" element={<Auth/>} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home/>} />
          <Route path="set/:id/cartes" element={<Cards/>} />
          <Route path="/ajouter-une-annonce" element={<p>Vendre une carte</p>} />
          <Route path="/profil" element={<p>Mon profil</p>} />
          <Route path="/mes-annonces" element={<p>Mes annonces</p>} />
          <Route path="/catalogue" element={<p>Catalogue de cartes</p>} />
          <Route path="/cartes-en-stock" element={<p>Cartes en stock (en vente)</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
