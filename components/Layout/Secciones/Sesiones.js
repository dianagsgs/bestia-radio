import styles from "./Sesiones.module.css";
import { useCallback, useEffect, Fragment, useState } from "react";
import axios from "axios";
import Section from "../../UI/Section";

export default function Sesiones(props) {
  const [sesiones, setSesiones] = useState(null);

  const getItems = () => {
    let items = [];
    if(sesiones !== null){
      for(let i = 0; i < sesiones.length; i++){
        let sesion = sesiones[i];
        let item =
            <div class={props.mobile ? styles.sesion_mobile : styles.sesion}>
              <iframe
                height="100%"
                width="100%"
                src={sesion[1]}
                title={sesion[3]}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>;
        items.push(item);
      }
    }
    return items;
  };

  useEffect(() => {
    axios({
      method: "GET",
      url:"/api/get_sesiones"
    })
    .then((response) => {
      setSesiones(response.data);
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
        mobile={props.mobile}
      >
        <div className={props.mobile ? "" : "row"}>
          {getItems()}
        </div>
      </Section>
    </Fragment>
  );
}
