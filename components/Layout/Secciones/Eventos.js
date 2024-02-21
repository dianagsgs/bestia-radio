import styles from "./Eventos.module.scss";
import { useEffect, useState } from "react";
import Section from "../../UI/Section";
import axios from "axios";
import ResponsiveCarousel from "../../UI/ResponsiveCarousel";
import { InstagramEmbed } from "react-social-media-embed";

export default function Eventos(props) {
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
          <div class={styles.eventsItem}>
            <InstagramEmbed url="https://www.instagram.com/p/CzWyZ6ZOL-7/" />
          </div>
          <div class={styles.eventsItem}>
            <InstagramEmbed url="https://www.instagram.com/p/C1A8pNBLOyJ/" />
          </div>
          <div class={styles.eventsItem}>
            <InstagramEmbed url="https://www.instagram.com/p/Cyuez3Vuitm/" />
          </div>
        </ResponsiveCarousel>
      </Section>
    </div>
  );
}
