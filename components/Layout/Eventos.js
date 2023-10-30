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
        console.log('here' + eventos[i].nombre)
        let item =
          <div
            className="row"
            id={"evento_"+i}
          >
            <div className="col-lg-6">
              {eventos[i].nombre}
              <CustomImage
                resp_w="20vw"
                src={"/img/eventos/"+eventos[i].flyer}
                w="83"
                h="110"
                id={"foto"+i}
              />
            </div>
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
      >
        {eventos}
      </Section>
    </Fragment>
  );
}
