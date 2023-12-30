import styles from "./Editorial.module.css";
import { Fragment, useEffect, useState } from "react";
import Section from "../../UI/Section"

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import CustomImage from "../../UI/CustomImage";
import CustomButton from "../../UI/CustomButton";

import { useRouter } from "next/router";

import axios from "axios";

export default function Editorial(props) {
  const [articulos, setArticulos] = useState([]);
  const router = useRouter();

  const goToStory = (id) => {
    router.push("/archivo?id=" + id);
  }

  const getItems = (noticias) => {
    let items = [];
    let first_one = true;
    for (let i = 0; i < articulos.length; i++) {
      console.log(articulos[i])
      let check = noticias ? articulos[i].tipo === "NOTICIA" : articulos[i].tipo !== "NOTICIA";
      if (check) {
        if(!noticias && first_one) {
          first_one = false;
        } else {
          let item =
            <div class={props.mobile ? 
              (noticias ? styles.mini_noticias_mobile : styles.editorial_mobile) :
              (noticias ? styles.mini_noticia : styles.editorial)
            }>
              <div class={props.mobile ? styles.font_tipo_mobile : styles.font_tipo}>
                {articulos[i].tipo}
              </div>
              <CustomImage
                resp_w={props.mobile ? "80vw" : "24vw"}
                src={articulos[i].foto_path}
                w={noticias ? "1200" :"2048"}
                h={noticias ? "675" : "2570"}
                id={"foto"+i}
                class={props.mobile ?
                  (noticias ? styles.noticias_foto_mobile : styles.otra_foto_mobile) :
                  (noticias ? styles.noticias_foto : styles.otra_foto)}
                onclick={noticias ? () => console.log("nothing") : () => goToStory(articulos[i].id)}
              />
              {noticias ?
                <span>
                  <div class={props.mobile ? styles.font_titulo_mobile : styles.font_titulo}>
                    {articulos[i].titulo}
                  </div>
                  <p class={props.mobile ? styles.font_blurb_mobile : styles.font_blurb}>
                    {articulos[i].blurb}
                    {articulos[i].link === "" || articulos[i].link === null ?
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
                </span> :
                <span/>
              }
            </div>;
          items.push(item);
        }
      }
    }
    return items;
  };

  const getPortada = () => {
    let portada_data = {"tipo":"","foto_path":"/dummy.png","blurb":""};
    for (let i = 0; i < articulos.length; i++) {
      portada_data = articulos[i];
      if (portada_data.tipo !== "NOTICIA") break;
    } 
    let portada =
      <div class={styles.cover_container}>
        <p class={props.mobile ? styles.font_cover_mobile : styles.font_cover}>
          PORTADA
        </p>
        <CustomImage
          resp_w={props.mobile ? "95vw" : "75vw"}
          src={portada_data.foto_path}
          w="2048"
          h="2570"
          class={props.mobile ? styles.cover_mobile : styles.cover}
        />
        <p class={styles.cover_blurb_font}>
          {portada_data.blurb}
        </p>
        <CustomButton
          src={"/img/leer_mas.png"}
          hover_src={"/img/leer_mas.png"}
          w={28}
          h={10}
          resp_w={props.mobile ? "20vw" : "10vw"}
          type="internal"
          href={"/archivo?id="+portada_data.id}
          button_class={props.mobile ? styles.boton_mas_mobile : styles.boton_mas}
        />
      </div>
    return portada;
  }

  const getArchivo = () => {
    return (
      <span>
        <p
          class={props.mobile ? styles.font_cover_mobile : styles.font_cover}
          onClick={() => router.push("/archivo")}
        >
          ARCHIVO
        </p>
        <Carousel
          responsive={responsive}
          infinite={true}
        >
          {getItems(false)}
        </Carousel>
      </span>
    );
  };

  const getRaro = () => {
    return (
      <div class={styles.cover_container}>
        <p class={props.mobile ? styles.font_raro_mobile : styles.font_raro}>
          RARO
        </p>
        <CustomImage
          resp_w={props.mobile ? "95vw" : "75vw"}
          src="https://vvqskzptir4l8fs6.public.blob.vercel-storage.com/articulos/placeholderraro-pDEYgQ484Np3mj2kRXT3UjYctRLI39.png"
          w="1200"
          h="475"
          class={props.mobile ? styles.raro_mobile : styles.raro}
        />
      </div>
    );
  };

  const getSPA = () => {
    return (
      <div class={styles.cover_container}>
        <p class={props.mobile ? styles.font_SPA_mobile : styles.font_SPA}>
          {props.mobile ? "S.P.A." : "SOLO PARA ADULTOS"}
        </p>
        <CustomImage
          resp_w={props.mobile ? "95vw" : "75vw"}
          src="https://vvqskzptir4l8fs6.public.blob.vercel-storage.com/articulos/placeholderraro-pDEYgQ484Np3mj2kRXT3UjYctRLI39.png"
          w="1200"
          h="475"
          class={props.mobile ? styles.raro_mobile : styles.raro}
        />
      </div>
    );
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
        id="ruidodeldia"
        titulo="/img/titulos/ruidodeldia.png"
        mobile={props.mobile}
      >
        <Carousel
          responsive={responsive}
          infinite={true}
        >
          {getItems(true)}
        </Carousel>
      </Section>

      <Section
        id="editorial"
        titulo="/img/titulos/editorial.png"
        mobile={props.mobile}
      >
        {getPortada()}
        {getRaro()}
        {getSPA()}
        {/*getArchivo()*/}
      </Section>
    </Fragment>
  );
}
