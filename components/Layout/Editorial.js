import styles from "./Editorial.module.css";
import { Fragment } from "react";
import Section from "./Section"


export default function Editorial(props) {
  
  return (
    <Fragment>
      <Section
        id="editorial"
        titulo="/img/titulos/editorial.png"
      >
        EDITORIAL
      </Section>
    </Fragment>
  );
}
