import styles from "./Eventos.module.scss";
import { useEffect, useState } from "react";
import Section from "../../UI/Section";
import axios from "axios";
import ResponsiveCarousel from "../../UI/ResponsiveCarousel";
import { InstagramEmbed } from "react-social-media-embed";

export default function Eventos(props) {
  const [eventos, setEventos] = useState(null);

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
              width={"100%"}
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
              width={"100%"}
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
              width={"100%"}
            />
          </div>
        </ResponsiveCarousel>
      </Section>
    </div>
  );
}
