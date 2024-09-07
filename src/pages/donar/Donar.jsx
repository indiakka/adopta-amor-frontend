import Form from "../../components/form/Form";
import React from "react";
import SignIn from "../signin/SignIn";
import "./donar.css";

const Donar = () => {
  return (
    <div>
      <div className="container-donar">
        <h1>Dona un animal</h1>
        <p>¿Conoces un animal que necesita un nuevo hogar?</p>
      </div>
      <Form />
    </div>
  );
};

export default Donar;
