import React from "react";
import style from "./card.module.css";
export default function Card({ mascotas }) {
  console.log(mascotas);

  return (
    <div className={style.card}>
      <div className={style.body}>
        <h3>{mascotas.name}</h3>
        <p>Raza: {mascotas.raza.Nombre}</p>
        <p>Nacimiento: {mascotas.nacimiento.split("-").reverse().join("-")}</p>
        <p>
          {mascotas.edad} {mascotas.edadtipo}
        </p>
      </div>
    </div>
  );
}
