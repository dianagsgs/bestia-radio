import styles from "./Editorial.module.css";
import { Fragment } from "react";
import Section from "../../UI/Section"


export default function Editorial(props) {
  
  return (
    <Fragment>
      <Section
        id="editorial"
        titulo="/img/titulos/editorial.png"
        mobile={props.mobile}
        background_num={props.background_num}
      >
        EDITORIAL
      </Section>
    </Fragment>
  );
}
