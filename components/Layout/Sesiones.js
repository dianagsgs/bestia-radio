import styles from "./Sesiones.module.css";
import { useCallback, useEffect, Fragment, useState } from "react";
import Section from "./Section"
import axios from "axios";

export default function Sesiones(props) {
  const [sesiones, setSesiones] = useState(null);

  const getItem = (sesion) => {
    let item =
    <div className="col-lg-6">
      <div class={styles.sesion}>
        <iframe
          width="100%"
          height="100%"
          src={sesion[1]}
          title={sesion[3]}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>    
    </div>
    return item;
  };

  useEffect(() => {
    axios({
      method: "GET",
      url:"/api/get_sesiones"
    })
    .then((response) => {
      const dos_sesiones = response.data;
      let items = []
      for(let i = 0; i < dos_sesiones.length; i++) {
        items.push(getItem(dos_sesiones[i]));
      }
      setSesiones(items);
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    })
  }, []);

  return (
    <Fragment>
      <Section
        id="sesiones"
        titulo="/img/titulos/sesiones.png"
        title_width="110"
        mobile={props.mobile}
      >
        <div className="row">
          {sesiones}
        </div>
      </Section>
    </Fragment>
  );
}
