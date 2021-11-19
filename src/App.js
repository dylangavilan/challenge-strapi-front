import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import Formulario from "./components/Form";
function App() {
  const [razas, setRazas] = useState([]);
  const getAll = async () => {
    let razas = await axios.get("http://localhost:1337/razas");
    setRazas(razas.data);
  };
  console.log(razas);
  useEffect(() => {
    getAll();
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/form" element={<Formulario razas={razas} />} />
      </Routes>
    </div>
  );
}

export default App;
