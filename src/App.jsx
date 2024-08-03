import { Route, Routes } from "react-router-dom";
import Inicio from "./pages/Inicio";
import NavBar from "./components/layout/NavBar";
import { useContext, useEffect } from "react";
import Footer from "./components/layout/Footer";
import TiendaDetail from "./pages/TiendaDetail";
import { CarritoContext } from "./components/context/CarritoContext";
import Busqueda from "./pages/Busqueda";

function App() {

  const {cargarCarrito} = useContext(CarritoContext)

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
