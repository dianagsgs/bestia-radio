import styles from "./Raro.module.css";
import { Fragment } from "react";
import Section from "./Section"


export default function Raro(props) {
  
  return (
    <Fragment>
      <Section
        id="raro"
        titulo="/img/titulos/raro.png"
      >
        RARO
      </Section>
    </Fragment>
  );
}
