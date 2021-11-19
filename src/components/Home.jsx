import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Cards";
// import style from "./home.module.css";
export default function Home() {
  const [mascotas, setMascotas] = useState([]);
  const getMascotas = async () => {
    const response = await axios.get("http://localhost:1337/mascotas");
    setMascotas(response.data);
  };
  useEffect(() => {
    getMascotas();
  }, []);
  return (
    <div>
      {mascotas &&
        mascotas.map((c) => {
          return <Card mascotas={c} />;
        })}
    </div>
  );
}
