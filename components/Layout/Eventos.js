import styles from "./Eventos.module.css";
import { Fragment } from "react";
import Section from "./Section"


export default function Eventos(props) {
  
  return (
    <Fragment>
      <Section
        id="eventos"
        titulo="/img/titulos/eventos.png"
        title_width="100"
      >
        EVENTOS
      </Section>
    </Fragment>
  );
}
