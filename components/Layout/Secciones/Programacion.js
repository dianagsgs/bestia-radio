import styles from "./Programacion.module.scss";
import { Fragment, useEffect, useState } from "react";
import Section from "../../UI/Section";

import axios from "axios";
import ResponsiveCarousel from "../../UI/ResponsiveCarousel";
import classNames from "classnames";

export default function Programacion(props) {
  const [programacion, setProgramacion] = useState({});

  const getProgramas = (day) => {
    let items = [];
    let programacion_day = programacion[day];
    if (programacion_day !== undefined) {
      for (let i = 10; i < 21; i++) {
        let time = i + "hrs";
        let programa =
          programacion_day[time] == undefined
            ? "Sandwich Musical"
            : programacion_day[time];
        let item = (
          <p class={styles.font_horario}>
            {time} - {programa}
          </p>
        );
        items.push(item);
      }
    }
    return items;
  };

  const getItems = () => {
    let items = [];
    const d = new Date();
    let day = d.getDay();
    if (day == 0 || day == 6) day = 1;
    day = day - 1;
    let days = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES"];
    for (let i = 0; i < days.length; i++) {
      let index = props.mobile ? (i + day) % 5 : i;
      let item = (
        <div
          className={classNames(
            props.mobile ? styles.un_dia_mobile : styles.un_dia,
            styles.showSchedule
          )}
        >
          <p class={styles.showsScheduleDay}>{days[index]}</p>
          {getProgramas(days[index])}
        </div>
      );
      items.push(item);
    }
    return items;
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: "/api/get_programas",
    })
      .then((response) => {
        setProgramacion(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }, []);

  return (
    <Fragment>
      <Section
        id="programacion"
        titulo="/img/titulos/programacion.png"
        mobile={props.mobile}
      >
        <div className={styles.showsContainer}>
          <ResponsiveCarousel
            infinite={props.mobile ? true : false}
            num_items={5}
          >
            {getItems()}
          </ResponsiveCarousel>
        </div>
      </Section>
    </Fragment>
  );
}
