import CustomImage from "./CustomImage";
import styles from "./Section.module.css";
import { Fragment } from "react";


export default function Section(props) {

  const background_src = "url(/img/Fondo/fondo_"+(props.mobile ? "mobile" : "desktop")+"_"+props.background_num+".png)";
  
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
            w="130"
            h="30"
            id={"titulo" + props.id}
            class={props.mobile ? styles.titulo_mobile : styles.titulo}
          />
          {props.children}
        </section>  
    </Fragment>
  );
}
