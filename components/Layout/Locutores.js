import styles from "./Locutores.module.css";
import { Fragment } from "react";
import Section from "./Section"


export default function Locutores(props) {
  
  return (
    <Fragment>
      <Section
        id="locutores"
        titulo="/img/titulos/locutores.png"
        title_width="110"
      >
        LOCUTORES
      </Section>
    </Fragment>
  );
}
