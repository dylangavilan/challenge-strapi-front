import React, { useState } from "react";
import axios from "axios";
import style from "./form.module.css";
import { Form } from "react-bootstrap";
function validate(input, exact) {
  let errors = {};
  console.log(input, exact);
  if (!input.name) {
    errors.name = "Nombre requerido";
  }
  if (!input.sexo) {
    errors.sexo = "Nombre de usuario requerido";
  }
  if (exact && !input.date) {
    errors.date = "Fecha requerida";
  }
  if (!exact && input.years === 0) {
    errors.years = "Edad requerida";
  }
  if (!input.sexo) {
    errors.sexo = "Sexo requerido";
  }
  return errors;
}
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
  const [errors, setErrors] = useState({});
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
    setErrors(
      validate(
        {
          ...input,
          [e.target.name]: e.target.value,
        },
        exact
      )
    );
  };
  return (
    <div className={style.all}>
      <div className={style.container}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1>Agrega tu mascota!</h1>

          <div className={style.subcontainer}>
            <label className={style.label}>Nombre</label>
            <input
              type="nombre"
              placeholder="Ingrese nombre"
              name="name"
              onChange={(e) => {
                onChangeInput(e);
              }}
            />
          </div>
          <div className={style.subcontainer}>
            <button
              className={exact ? style.marcado : style.normal}
              onClick={(e) => {
                setExact(true);
                e.preventDefault();
              }}
            >
              Fecha exacta
            </button>
            <button
              className={!exact ? style.marcado : style.normal}
              onClick={(e) => {
                setExact(false);
                e.preventDefault();
              }}
            >
              Aproximado
            </button>
          </div>
          {exact ? (
            <div className={style.subcontainer}>
              <label className={style.label}>Fecha de nacimiento</label>
              <input
                type="date"
                name="date"
                onChange={(e) => {
                  onChangeInput(e);
                }}
              />
              {errors.date ? errors.date : ""}
            </div>
          ) : (
            <div className={style.subcontainer}>
              <label className={style.label}>Edad</label>
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
                  setType(e.target.value);
                }}
              >
                <option value="year">Años</option>
                <option value="month">Meses</option>
              </Form.Control>
              {errors.years ? errors.years : ""}
            </div>
          )}
          <div className={style.subcontainer}>
            <input
              className={input.sexo === "Macho" ? style.marcado : style.normal}
              type="button"
              value="Macho"
              name="sexo"
              onClick={(e) => {
                onChangeInput(e);
              }}
            />
            <input
              className={input.sexo === "Hembra" ? style.marcado : style.normal}
              type="button"
              value="Hembra"
              name="sexo"
              onClick={(e) => {
                onChangeInput(e);
              }}
            />
            {errors.sexo ? errors.sexo : ""}
          </div>
          <div className={style.subcontainer}>
            <Form.Control
              as="select"
              onChange={(e) => {
                setRaza(e.target.value);
              }}
            >
              <option>Agregue una raza</option>
              {razas &&
                razas.map((c) => {
                  return <option value={c.Nombre}>{c.Nombre}</option>;
                })}
            </Form.Control>
          </div>
          {!Object.keys(errors).length && raza ? (
            <button>Crear</button>
          ) : (
            <h5>Una vez completados los campos podras agregarlo</h5>
          )}
        </form>
      </div>
    </div>
  );
}
