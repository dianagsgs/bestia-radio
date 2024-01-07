import styles from "./Quees.module.css";
import { Fragment } from "react";
import Section from "../../UI/Section"


export default function Quees(props) {
  
  return (
    <Fragment>
      <Section
        id="quees"
        titulo="/img/titulos/quees.png"
        mobile={props.mobile}
      >
        <p class={props.mobile ? styles.mobilefont : styles.customfont}>
          La Bestia Radio es el paraíso de los raros. Además de una finísima selección de
          rock alternativo que nadie conoce, por nuestro player y Twitch suenan las voces
          de la gente más ruidosa de México y el mundo. Las bandas más calientes del
          planeta se sientan en nuestras sillas y escupen nuestros micrófonos al hablar de
          los temas más irrelevantes del momento. Hemos agotado decenas de shows para unas
          cuantas personas. Nuestras líneas de ropa de temporada vuelan tan rápido que las
          líneas de producción se saturan. Los inversionistas se pelean por nuestras
          acciones. Es difícil explicar lo que puede sucederte si le pones play, así que
          sólo hazlo.
        </p>
      </Section>
    </Fragment>
  );
}
