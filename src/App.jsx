import { Routes, Route } from "react-router-dom";
import Home from "./views/home/Home";
import Cards from "./views/home/Cards";
import Menu from "./views/components/Menu";
import Auth from "./views/auth/Auth";
import MainLayout from "./views/layout/MainLayout";
// import RequireAuth from "./views/auth/RequireAuth";

function App() {
  return (
      <Routes>
        <Route path="/menu" element={<Menu/>} />
        <Route path="/login" element={<Auth/>} />
        <Route path="/" element={<MainLayout />}>
          <Route index path="/" element={<Home/>} />
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
