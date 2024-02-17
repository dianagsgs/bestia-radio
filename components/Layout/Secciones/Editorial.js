import styles from "./Editorial.module.scss";
import { useEffect, useState } from "react";
import Section from "../../UI/Section";
import CustomImage from "../../UI/CustomImage";
import CustomButton from "../../UI/CustomButton";
import { useRouter } from "next/router";
import axios from "axios";
import ResponsiveCarousel from "../../UI/ResponsiveCarousel";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";

export default function Editorial(props) {
  const [articulos, setArticulos] = useState([]);
  const router = useRouter();

  const goToStory = (id) => {
    router.push("/archivo?id=" + id);
  };

  const getItems = (noticias) => {
    let items = [];
    let first_one = true;
    for (let i = 0; i < articulos.length; i++) {
      let check = noticias
        ? articulos[i].tipo === "NOTICIA"
        : articulos[i].tipo !== "NOTICIA";
      if (check && articulos[i].activo) {
        if (!noticias && first_one) {
          first_one = false;
        } else {
          let item = (
            <div
              class={
                props.mobile
                  ? noticias
                    ? styles.mini_noticias_mobile
                    : styles.editorial_mobile
                  : noticias
                  ? styles.mini_noticia
                  : styles.editorial
              }
            >
              <div
                class={
                  props.mobile ? styles.font_tipo_mobile : styles.font_tipo
                }
              >
                {articulos[i].fecha}
              </div>
              <CustomImage
                resp_w={props.mobile ? "95vw" : "24vw"}
                src={articulos[i].foto_path}
                w={noticias ? "1200" : "2048"}
                h={noticias ? "675" : "2570"}
                id={"foto" + i}
                class={
                  props.mobile
                    ? noticias
                      ? styles.noticias_foto_mobile
                      : styles.otra_foto_mobile
                    : noticias
                    ? styles.noticias_foto
                    : styles.otra_foto
                }
                onclick={
                  noticias
                    ? () => console.log("nothing")
                    : () => goToStory(articulos[i].id)
                }
              />
              {noticias ? (
                <span>
                  <div
                    className={classNames(
                      props.mobile
                        ? styles.font_titulo_mobile
                        : styles.font_titulo,
                      styles.newsTitle
                    )}
                  >
                    {articulos[i].titulo}
                  </div>
                  <p
                    className={classNames(
                      props.mobile
                        ? styles.font_blurb_mobile
                        : styles.font_blurb,
                      styles.newsBody
                    )}
                  >
                    {articulos[i].blurb}
                    {articulos[i].link === "" || articulos[i].link === null ? (
                      <span />
                    ) : (
                      <a
                        class={styles.link}
                        target="_blank"
                        href={articulos[i].link}
                      >
                        aquí.
                      </a>
                    )}
                  </p>
                </span>
              ) : (
                <span />
              )}
            </div>
          );
          items.push(item);
        }
      }
    }
    return items;
  };

  const getPortada = () => {
    let portada_data = { tipo: "", foto_path: "/dummy.png", blurb: "" };
    for (let i = 0; i < articulos.length; i++) {
      portada_data = articulos[i];
      if (portada_data.tipo === "ENTREVISTA" && portada_data.activo) break;
    }
    const portadaLink = portada_data?.link ?? "/";

    let portada = (
      <div
        class={
          props.mobile ? styles.cover_container_mobile : styles.cover_container
        }
      >
        <CustomImage
          resp_w={props.mobile ? "95vw" : "75vw"}
          src={portada_data.foto_path}
          w="2048"
          h="2570"
          class={props.mobile ? styles.cover_mobile : styles.cover}
        />
        <p class={props.mobile ? styles.font_cover_mobile : styles.font_cover}>
          {portada_data.titulo}
        </p>
        <p
          class={
            props.mobile
              ? styles.cover_blurb_font_mobile
              : styles.cover_blurb_font
          }
        >
          {portada_data.blurb}
        </p>
        <div className={styles.portadaLink}>
          <Link href={portadaLink}>
            <Image
              src="/img/leer_mas.png"
              width={28}
              height={10}
              layout="responsive"
            />
          </Link>
        </div>
      </div>
    );
    return portada;
  };

  const getArchivo = () => {
    return (
      <span>
        <p
          class={props.mobile ? styles.font_cover_mobile : styles.font_cover}
          onClick={() => router.push("/archivo")}
        >
          ARCHIVO
        </p>
        <ResponsiveCarousel infinite={true}>
          {getItems(false)}
        </ResponsiveCarousel>
      </span>
    );
  };

  const getOther = (type) => {
    let articulo_data = { tipo: "", foto_path: "/dummy.png", blurb: "" };
    for (let i = 0; i < articulos.length; i++) {
      articulo_data = articulos[i];
      if (articulo_data.tipo === type && articulo_data.activo) break;
    }
    const articuloLunk = articulo_data?.link ?? "/";

    return (
      <div
        class={
          props.mobile ? styles.cover_container_mobile : styles.cover_container
        }
      >
        <CustomImage
          resp_w={props.mobile ? "95vw" : "75vw"}
          src={articulo_data.foto_path}
          w="1200"
          h="475"
          class={props.mobile ? styles.cover_mobile : styles.cover}
        />
        <div className={styles.portadaLink}>
          <Link href={articuloLunk}>
            <Image
              src="/img/leer_mas.png"
              width={28}
              height={10}
              layout="responsive"
            />
          </Link>
        </div>
      </div>
    );
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: "/api/get_articulos",
    })
      .then((response) => {
        setArticulos(response.data);
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
    <>
      <Section
        id="ruidodeldia"
        titulo="/img/titulos/ruidodeldia.png"
        mobile={props.mobile}
      >
        <ResponsiveCarousel infinite={false}>
          {getItems(true)}
        </ResponsiveCarousel>
      </Section>
      <Section
        id="portada"
        titulo="/img/titulos/portada.png"
        mobile={props.mobile}
      >
        {getPortada()}
      </Section>
      <Section id="raro" titulo="/img/titulos/raro.png" mobile={props.mobile}>
        {getOther("RARO")}
      </Section>
      <Section
        id="soloparaadultos"
        titulo="/img/titulos/soloparaadultos.png"
        mobile={props.mobile}
      >
        {getOther("S.P.A.")}
      </Section>
      <Section
        id="vacalado"
        titulo="/img/titulos/vacalado.png"
        mobile={props.mobile}
      >
        {getOther("VA CALADO")}
      </Section>
    </>
  );
}
