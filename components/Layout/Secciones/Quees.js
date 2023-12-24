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
        background_num={props.background_num}
      >
        <p class={props.mobile ? styles.mobilefont : styles.customfont}>
          Desde su fundación en 2020, La Bestia Radio no sólo se ha dado a conocer gracias a sus rituales
          satánicos y partidas de ouija con músicos fallecidos por sobredosis en los años 90, sino también
          por ser la nueva estación de rock alternativo de La CDMX. Entre nuestros locutores se encuentran
          algunos de los músicos que más ruido hacen en la ciudad más grande y ruidosa del mundo. Junto al
          staff de La Bestia Music Inc. se encargan de curar a mano una finísima selección musical de rock
          alternativo que nadie conoce. La Bestia Radio se mantiene independiente y no se vende… porque
          nadie la quiere comprar.
        </p>
      </Section>
    </Fragment>
  );
}
