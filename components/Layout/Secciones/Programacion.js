import styles from "./Programacion.module.css";
import { Fragment, useEffect, useState } from "react";
import Section from "../../UI/Section"

import axios from "axios";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function Programacion(props) {
  const [programacion, setProgramacion] = useState({});

  const getProgramas = (day) => {
    let items = [];
    let programacion_day = programacion[day];
    if (programacion_day !== undefined) {
      for (let i = 10; i < 21; i++) {
        let time = i + "hrs";
        let programa = programacion_day[time] == undefined ? "" : programacion_day[time];
        let item = 
          <p class={styles.font_horario}>
            {time} - {programa}
          </p>
        items.push(item)
      }
    }
    return items
  };

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
          {getProgramas(days[index])}
        </div>
      items.push(item);
    }
    return items;
  };

  useEffect(() => {
    axios({
      method: "GET",
      url:"/api/get_programas"
    })
    .then((response) => {
      setProgramacion(response.data);
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    })
  }, []);

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
