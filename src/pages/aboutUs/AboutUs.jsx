import "./aboutUs.css";
import React from "react";

const AboutUs = () => {
  return (
    <div className="aboutUs-container">
      <h2>
        <b>Sobre nosotras</b>
      </h2>
      <article className="aboutUs-article">
        <div>
          <p>
            En un mundo donde la conexión entre humanos y animales es esencial,
            un grupo de desarrolladoras y amantes de los peludos se unió con un
            propósito claro: crear un espacio virtual que facilite la adopción y
            donación de mascotas que necesitan un hogar lleno de amor. Porque
            cada patita merece un techo y cada ronroneo o lametón, una familia
            que lo reciba con cariño.
          </p>
          <p>
            Además, queremos concienciar sobre el abandono animal, dando
            visibilidad a estos amiguitos que solo buscan una segunda
            oportunidad para dar y recibir amor.
          </p>
        </div>
        <img src="./assets/images/aboutUs.avif" alt="perro con flor" />{" "}
      </article>
    </div>
  );
};

export default AboutUs;
