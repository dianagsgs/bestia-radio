import CustomImage from "../UI/CustomImage";
import styles from "./Section.module.css";
import { Fragment } from "react";


export default function TwitchYChat(props) {

  const background_src = "url(/img/Fondo/Fondo.jpg)";
  
  return (
    <Fragment>
      <section
          className={styles.section}
          id={props.id}
          style={{ backgroundImage: background_src }}
        >
          <CustomImage
            resp_w="30vw"
            src={props.titulo}
            w="200"
            h="35"
            id={"titulo" + props.id}
            class={styles.titulo}
          />
          {props.children}
        </section>  
    </Fragment>
  );
}
