import CustomImage from "./CustomImage";
import styles from "./Section.module.css";
import { Fragment } from "react";


export default function Section(props) {  
  return (
    <Fragment>
      <section
          className={props.mobile ? styles.section_mobile : styles.section}
          id={props.id}
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
