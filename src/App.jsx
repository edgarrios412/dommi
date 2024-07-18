import { Route, Routes, useLocation } from "react-router-dom";
import Inicio from "./pages/Inicio";
import SorteoDetail from "./pages/SorteoDetail";
import NavBar from "./components/layout/NavBar";
import { useContext, useEffect } from "react";
import { UserContext } from "./components/context/UserContext";
import Footer from "./components/layout/Footer";
import Apertura from "./pages/Apertura";
import TiendaDetail from "./pages/TiendaDetail";

function App() {

  const { updateUsuario } = useContext(UserContext)

  const location = useLocation()

  useEffect(() => {
    updateUsuario()
  }, [])

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/tienda/:id" element={<TiendaDetail />} />
      </Routes>
      <Footer/>
      {/* {location.pathname != "/" && <Footer />} */}
    </>
  );
}

export default App;
