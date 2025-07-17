import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Inicio from "./pages/inicio";
import Error404 from "./pages/404";
import Navbar from "./components/Navbar";
import QuienesSomos from "./pages/QuienesSomos";
import Contactanos from "./pages/Contactanos";
import Formulario from "./pages/agregar";
import FormularioMasivo from "./pages/FormMasivo";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/QuienesSomos" element={<QuienesSomos />} />     
        <Route path="/Contactanos" element={<Contactanos />} />   
        <Route path="/agregar" element={<Formulario />} />   
        <Route path="/formMasivo" element={<FormularioMasivo />} />   
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
