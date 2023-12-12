import CustomImage from "../UI/CustomImage";
import styles from "./Section.module.css";
import { Fragment } from "react";


export default function Section(props) {

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const background_src = "url(/img/Fondo/fondo_"+(props.mobile ? "mobile" : "desktop")+"_"+getRandomInt(4)+".png)";
  
  return (
    <Fragment>
      <section
          className={props.mobile ? styles.section_mobile : styles.section}
          id={props.id}
          style={{ backgroundImage: background_src }}
        >
          <CustomImage
            resp_w={props.mobile ? "50vw ": "15vw"}
            src={props.titulo}
            w={props.title_width}
            h="35"
            id={"titulo" + props.id}
            class={props.mobile ? styles.titulo_mobile : styles.titulo}
          />
          {props.children}
        </section>  
    </Fragment>
  );
}
