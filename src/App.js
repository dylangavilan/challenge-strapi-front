import react, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import Formulario from "./components/Form";
function App() {
  const [razas, setRazas] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const getAll = async () => {
    let razas = await axios.get("http://localhost:1337/razas");
    let mascotas = await axios.get("http://localhost:1337/mascotas");
    setRazas(razas.data);
    setMascotas(mascotas.data);
  };
  useEffect(() => {
    getAll();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/form" element={<Formulario razas={razas} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
