import { Route, Routes, useLocation } from "react-router-dom";
import Inicio from "./pages/Inicio";
import SorteoDetail from "./pages/SorteoDetail";
import NavBar from "./components/layout/NavBar";
import { useContext, useEffect } from "react";
import { UserContext } from "./components/context/UserContext";
import Footer from "./components/layout/Footer";
import Apertura from "./pages/Apertura";
import TiendaDetail from "./pages/TiendaDetail";
import { CarritoContext } from "./components/context/CarritoContext";
import Busqueda from "./pages/Busqueda";

function App() {

  const {cargarCarrito} = useContext(CarritoContext)

  const location = useLocation()

  useEffect(() => {
    cargarCarrito()
  }, [])

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/buscar/:busqueda" element={<Busqueda />} />
        <Route path="/tienda/:id" element={<TiendaDetail />} />
      </Routes>
      <Footer/>
      {/* {location.pathname != "/" && <Footer />} */}
    </>
  );
}

export default App;
