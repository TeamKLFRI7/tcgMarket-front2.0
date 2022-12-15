import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./views/home/Home";
import Cards from "./views/home/Cards";
import MainLayout from "./views/layout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home/>} />
          <Route path="setName/cards" element={<Cards/>} />
          <Route path="/sell" element={<p>sell</p>} />
          <Route path="/menu" element={<p>menu</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
