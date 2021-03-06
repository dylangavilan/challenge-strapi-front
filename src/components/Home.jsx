import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Cards";
import style from "./home.module.css";
import { Link } from "react-router-dom";
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
    <div className={style.container}>
      <div className={style.subcontainer}>
        <Link to="/form">
          <button className={style.button}>Agrega tu mascota</button>
        </Link>
      </div>
      {mascotas?.map((c) => {
        return <Card mascotas={c} />;
      })}
    </div>
  );
}
