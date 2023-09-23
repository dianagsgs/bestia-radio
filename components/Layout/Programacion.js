import styles from "./Programacion.module.css";
import { Fragment } from "react";
import Section from "./Section"
import CustomImage from "../UI/CustomImage";


export default function Programacion(props) {
  
  return (
    <Fragment>
      <Section
        id="programacion"
        titulo="/img/titulos/programacion.png"
      >
        <CustomImage
          resp_w="61vw"
          src="/img/calendario.png"
          w="140"
          h="75"
          id="calendario"
          class={styles.calendario}
        />
      </Section>
    </Fragment>
  );
}
