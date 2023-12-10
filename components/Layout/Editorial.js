import styles from "./Editorial.module.css";
import { Fragment } from "react";
import Section from "./Section"


export default function Editorial(props) {
  
  return (
    <Fragment>
      <Section
        id="editorial"
        titulo="/img/titulos/editorial.png"
        title_width="110"
        mobile={props.mobile}
      >
        EDITORIAL
      </Section>
    </Fragment>
  );
}
