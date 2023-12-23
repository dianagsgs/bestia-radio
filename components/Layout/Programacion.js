import styles from "./Programacion.module.css";
import { Fragment } from "react";
import Section from "./Section"

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function Programacion(props) {

  const getItems = () => {
    let items = [];
    const d = new Date();
    let day = d.getDay();
    if(day == 0 || day == 6) day = 1;
    day = day-1;
    let days = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES"];
    for(let i = 0; i < days.length; i++) {
      let index = (i + day) % 5; 
      let item =
        <div class={props.mobile ? styles.un_dia_mobile : styles.un_dia}>
          <p class={styles.font_nombre_dia}>{days[index]}</p>
          <p class={styles.font_horario}>
            10am - La Hora de la Bestia
          </p>
          <p class={styles.font_horario}>
            11am - Desinformando a la Banda
          </p>
          <p class={styles.font_horario}>
            12pm - Carolina in PJs
          </p>
          <p class={styles.font_horario}>
            12pm - Carolina in PJs
          </p>
          <p class={styles.font_horario}>
            12pm - Carolina in PJs
          </p>
          <p class={styles.font_horario}>
            12pm - Carolina in PJs
          </p>
          <p class={styles.font_horario}>
            12pm - Carolina in PJs
          </p>
          <p class={styles.font_horario}>
            12pm - Carolina in PJs
          </p>
          <p class={styles.font_horario}>
            12pm - Carolina in PJs
          </p>
          <p class={styles.font_horario}>
            12pm - Carolina in PJs
          </p>
          <p class={styles.font_horario}>
            12pm - Carolina in PJs
          </p>
        </div>
      items.push(item);
    }
    return items;
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  
  return (
    <Fragment>
      <Section
        id="programacion"
        titulo="/img/titulos/programacion.png"
        title_width="130"
        mobile={props.mobile}
        background_num={props.background_num}
      >
       <Carousel
          responsive={responsive}
          infinite={props.mobile ? true : false}
        >
          {getItems()}
        </Carousel>
      </Section>
    </Fragment>
  );
}
