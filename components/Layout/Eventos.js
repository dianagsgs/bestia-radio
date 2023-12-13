import styles from "./Eventos.module.css";
import { Fragment, useEffect, useState } from "react";
import Section from "./Section";
import axios from "axios";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import CustomImage from "../UI/CustomImage";

export default function Eventos(props) {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url:"/api/get_eventos"
    })
    .then((response) => {
      const eventos = response.data;
      let items = [];
      for(let i = 0; i < eventos.length; i++) {
        // OTHER AVAILABLE DATA
        // eventos[i].fecha
        // eventos[i].hora
        // eventos[i].lugar
        let item =
          <div className="col-lg-3" id={"evento_"+i}>
            <CustomImage
              resp_w="20vw"
              src={eventos[i].flyer}
              w="83"
              h="110"
              id={"foto"+i}
              class={styles.flyer}
            />
            <div class={styles.event_desc}>
              {eventos[i].nombre}, {eventos[i].precio} - {eventos[i].registro ? <a class={styles.boton_registro} href="mailto:contacto@somoslabestia.com?Subject=Solicitud%20de%20registro%20para%20evento&body=Me%20quiero%20registrar%20para%3A%0ANombre%3A%0AApellido%3A%0ACorreo%3A">con registro</a> :" sin registro"}
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

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
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
        id="eventos"
        titulo="/img/titulos/eventos.png"
        title_width="100"
        mobile={props.mobile}
        background_num={props.background_num}
      >
        <Carousel
          responsive={responsive}
          infinite={true}
        >
          {eventos}
        </Carousel>
      </Section>
    </Fragment>
  );
}
