import styles from "./Editorial.module.css";
import { Fragment } from "react";
import Section from "../../UI/Section"

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import CustomImage from "../../UI/CustomImage";

export default function Editorial(props) {

  const articulos = [
    {
      "id":"1",
      "tipo":"NOTICIA",
      "titulo":"Turnstile anuncia concierto en CDMX",
      "foto_path":"/img/mininoticia1.png",
      "blurb":"El concierto sera en el pabellon del palacio de los deportes y todos iremos a ver a daniel fang mi amor. Compra tus boletos ",
      "link":"https://www.ticketmaster.com.mx/turnstile-boletos/artist/1984721"
    },
    {
      "id":"2",
      "tipo":"RARO",
      "titulo":"Aqui va algo raro",
      "foto_path":"/img/mininoticia1.png",
      "blurb":"Todavia no entiendo bien cual es la sección de raro, pero iría aquí. Como ejemplo, voy a escribir un párrafo más largo para ver como se vería si Jen se inspira y escribe una mini noticia no tan mini, que se pase del largo del espacio que le puse.",
      "link":""
    },
    {
      "id":"3",
      "tipo":"ENTREVISTA",
      "titulo":"Entrevista con Chai",
      "foto_path":"/img/mininoticia1.png",
      "blurb":"Descubre cuál es el Pokemon más delicioso según la banda y como se la pasaron en México. Chécala ",
      "link":"https://www.instagram.com/reel/CzDFRwrOE3R/"
    },
    {
      "id":"4",
      "tipo":"S.P.A.",
      "titulo":"Aqui va algo para adultos",
      "foto_path":"/img/mininoticia1.png",
      "blurb":"Tampoco entiendo esta sección pero oí que la mencionaron en nuestra reunión.",
      "link":""
    }
  ];

  const getItems = () => {
    let items = [];
    for (let i = 0; i < articulos.length; i++) {
      let item =
        <div class={props.mobile ? styles.mini_noticias_mobile : styles.mini_noticia}>
          <p class={props.mobile ? styles.font_tipo_mobile : styles.font_tipo}>
            {articulos[i].tipo}
          </p>
          <CustomImage
            resp_w={props.mobile ? "80vw" : "24vw"}
            src={articulos[i].foto_path}
            w="1200"
            h="675"
            id={"foto"+i}
            class={props.mobile ? styles.foto_mobile : styles.foto}
          />
          <p class={props.mobile ? styles.font_titulo_mobile : styles.font_titulo}>
            {articulos[i].titulo}
          </p>
          <p class={props.mobile ? styles.font_blurb_mobile : styles.font_blurb}>
            {articulos[i].blurb}
            {articulos[i].link === "" ? 
              <span/> :
              <a 
                class={styles.link}
                target="_blank"
                href={articulos[i].link}
              >
                aquí.
              </a>
            }
          </p>
        </div>;
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
        id="editorial"
        titulo="/img/titulos/editorial.png"
        mobile={props.mobile}
        background_num={props.background_num}
      >
        <Carousel
          responsive={responsive}
          infinite={true}
        >
          {getItems()}
        </Carousel>
        <p class={props.mobile ? styles.font_cover_mobile : styles.font_cover}>
          PORTADA
        </p>
        <CustomImage
          resp_w={props.mobile ? "100vw" : "80vw"}
          src="/img/placeholdercover.png"
          w="2048"
          h="2570"
          class={props.mobile ? styles.cover_mobile : styles.cover}
        />
      </Section>
    </Fragment>
  );
}
