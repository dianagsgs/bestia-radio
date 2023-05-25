import styles from "./DiscosSemana.module.css";
import { Fragment } from "react";
import Section from "./Section"


export default function DiscosSemana(props) {
  
  return (
    <Fragment>
      <Section
        id="discos_semana"
        titulo="/img/titulos/discos.png"
      >
        DISCOS SEMANA
      </Section>
    </Fragment>
  );
}
