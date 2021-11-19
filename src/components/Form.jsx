import React, { useState } from "react";
import axios from "axios";
import style from "./form.module.css";
import { Button, Form } from "react-bootstrap";
export default function Formulario({ razas }) {
  const [exact, setExact] = useState(Boolean);
  const [input, setInput] = useState({
    name: "",
    years: 0,
    sexo: "",
    date: "",
  });
  const [raza, setRaza] = useState("");
  const [type, setType] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    await axios.post("http://localhost:1337/mascotas/create", {
      name: input.name,
      edadtipo: type,
      isExact: exact,
      date: input.date,
      years: input.years,
      raza: raza,
    });

    alert("Mascota creada");
  }
  const onChangeInput = (e) => {
    setInput((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  console.log(input);
  return (
    <div className="container">
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="nombre"
            placeholder="Ingrese nombre"
            name="name"
            onChange={(e) => {
              onChangeInput(e);
            }}
          />
        </Form.Group>
        <div>
          <button
            onClick={(e) => {
              setExact(true);
              e.preventDefault();
            }}
          >
            Fecha exacta
          </button>
          <button
            onClick={(e) => {
              setExact(false);
              e.preventDefault();
            }}
          >
            Aproximado
          </button>
        </div>
        {exact ? (
          <div>
            <label>Fecha de nacimiento</label>
            <input
              type="date"
              name="date"
              onChange={(e) => {
                onChangeInput(e);
              }}
            />
          </div>
        ) : (
          <div>
            <label>Edad</label>
            <input
              type="number"
              min=""
              max={type === "year" ? "60" : "12"}
              name="years"
              onChange={(e) => {
                onChangeInput(e);
              }}
            />
            <Form.Control
              as="select"
              onChange={(e) => {
                console.log("e.target.value", e.target.value);
                setType(e.target.value);
              }}
            >
              <option value="year">Años</option>
              <option value="month">Meses</option>
            </Form.Control>
          </div>
        )}
        <div>
          <input
            type="button"
            value="Macho"
            name="sexo"
            onClick={(e) => {
              onChangeInput(e);
            }}
          />
          <input
            type="button"
            value="Hembra"
            name="sexo"
            onClick={(e) => {
              onChangeInput(e);
            }}
          />
        </div>
        <div>
          <Form.Control
            as="select"
            onChange={(e) => {
              console.log("e.target.value", e.target.value);
              setRaza(e.target.value);
            }}
          >
            {razas &&
              razas.map((c) => {
                return <option value={c.Nombre}>{c.Nombre}</option>;
              })}
          </Form.Control>
        </div>
        <button type="submit">Crear</button>
      </Form>
    </div>
  );
}
