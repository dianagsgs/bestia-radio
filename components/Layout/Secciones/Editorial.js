import styles from "./Editorial.module.css";
import { Fragment, useEffect, useState } from "react";
import Section from "../../UI/Section"

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import CustomImage from "../../UI/CustomImage";

import axios from "axios";


export default function Editorial(props) {

  const [articulos, setArticulos] = useState([]);

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

  useEffect(() => {
    axios({
      method: "GET",
      url:"/api/get_articulos"
    })
    .then((response) => {
      setArticulos(response.data);
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
          resp_w={props.mobile ? "95vw" : "75vw"}
          src="/img/placeholdercover.png"
          w="2048"
          h="2570"
          class={props.mobile ? styles.cover_mobile : styles.cover}
        />
      </Section>
    </Fragment>
  );
}
