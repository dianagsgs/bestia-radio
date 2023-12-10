import styles from "./Eventos.module.css";
import { Fragment, useEffect, useState } from "react";
import Section from "./Section";
import axios from "axios";

import CustomImage from "../UI/CustomImage";

export default function Eventos(props) {
  const [eventos, setEventos] = useState(null);

  useEffect(() => {
    axios({
      method: "GET",
      url:"/api/get_eventos"
    })
    .then((response) => {
      const eventos = response.data;
      let items = [];
      for(let i = 0; i < eventos.length; i++) {
        let item =
          <div className="col-lg-6" id={"evento_"+i}>
            {/*{eventos[i].nombre}
            {eventos[i].fecha}
            {eventos[i].hora}
            {eventos[i].precio}*/}
            <CustomImage
              resp_w="25vw"
              src={"/img/eventos/"+eventos[i].flyer}
              w="83"
              h="110"
              id={"foto"+i}
              class={styles.flyer}
            />
          </div>
        items.push(item);
      }
      setEventos(items);
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
        id="eventos"
        titulo="/img/titulos/eventos.png"
        title_width="100"
        mobile={props.mobile}
      >
        <div className="row">
          {eventos}
        </div>
      </Section>
    </Fragment>
  );
}
