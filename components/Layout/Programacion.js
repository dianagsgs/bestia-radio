import styles from "./Programacion.module.css";
import { Fragment } from "react";
import Section from "./Section"
import CustomImage from "../UI/CustomImage";


export default function Programacion(props) {
  
  return (
    <Fragment>
      <Section
        id="programacion"
        titulo="/img/titulos/horario.png"
      >
        <CustomImage
          resp_w="80vw"
          src="/img/calendario.png"
          w="140"
          h="80"
          id="calendario"
          class={styles.calendario}
        />
      </Section>
    </Fragment>
  );
}
