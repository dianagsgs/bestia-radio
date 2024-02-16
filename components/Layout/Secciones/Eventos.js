import styles from "./Eventos.module.scss";
import { useEffect, useState } from "react";
import Section from "../../UI/Section";
import axios from "axios";
import ResponsiveCarousel from "../../UI/ResponsiveCarousel";
import { InstagramEmbed } from "react-social-media-embed";

export default function Eventos(props) {
  const [eventos, setEventos] = useState(null);

  const getItems = () => {
    let items = [];
    if(eventos !== null){
      for(let i = 0; i < eventos.length; i++){
        let evento = eventos[i];
        
        let fecha = new Date(evento.fecha+"T"+evento.hora+"-06:00");
        let pasado = fecha < Date.now();

        let desc_pasado =
          <div class={props.mobile ? styles.event_desc_mob : styles.event_desc}>
            {evento.nombre}, {evento.fecha} - {evento.galeria !== null ? <a class={styles.boton_registro} target="_blank" href={evento.galeria}>GALERIA</a> :"GALERIA"}
          </div>;

        let desc_futuro = 
          <div class={props.mobile ? styles.event_desc_mob : styles.event_desc}>
            {evento.nombre}, {evento.precio} - {evento.registro ? <a class={styles.boton_registro} href="mailto:contacto@somoslabestia.com?Subject=Solicitud%20de%20registro%20para%20evento&body=Me%20quiero%20registrar%20para%3A%0ANombre%3A%0AApellido%3A%0ACorreo%3A">con registro</a> :" sin registro"}
          </div>;

        let item =
          <div className="col-lg-3" id={"evento_"+i}>
            <CustomImage
              resp_w={props.mobile ? "80vw" : "20vw"}
              src={evento.flyer}
              w="83"
              h="110"
              id={"foto"+i}
              class={styles.flyer}
            />
            {pasado ? desc_pasado : desc_futuro}
          </div>;
        items.push(item);
      }
    }
    return items;
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: "/api/get_eventos",
    })
      .then((response) => {
        setEventos(response.data);
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
    <div className={styles.eventsSection}>
      <Section
        id="eventos"
        titulo="/img/titulos/eventos.png"
        mobile={props.mobile}
      >
        <ResponsiveCarousel infinite={false}>
          {/*getItems()*/}
          <div
            class={
              props.mobile
                ? styles.instagram_embed_mobile
                : styles.instagram_embed
            }
          >
            <InstagramEmbed
              url="https://www.instagram.com/p/CzWyZ6ZOL-7/"
              width={props.mobile ? "100%" : "93%"}
            />
          </div>
          <div
            class={
              props.mobile
                ? styles.instagram_embed_mobile
                : styles.instagram_embed
            }
          >
            <InstagramEmbed
              url="https://www.instagram.com/p/C1A8pNBLOyJ/"
              width={props.mobile ? "100%" : "93%"}
            />
          </div>
          <div
            class={
              props.mobile
                ? styles.instagram_embed_mobile
                : styles.instagram_embed
            }
          >
            <InstagramEmbed
              url="https://www.instagram.com/p/Cyuez3Vuitm/"
              width={props.mobile ? "100%" : "93%"}
            />
          </div>
        </ResponsiveCarousel>
      </Section>
    </div>
  );
}
