import styles from "./Radioteca.module.css";
import { Fragment } from "react";
import Section from "./Section"


export default function Radioteca(props) {
  
  return (
    <Fragment>
      <Section
        id="radioteca"
        titulo="/img/titulos/radioteca.png"
      >
        RADIOTECA
      </Section>
    </Fragment>
  );
}
