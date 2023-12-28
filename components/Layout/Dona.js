import styles from "./Dona.module.css";
import { Fragment } from "react";
import CustomButton from "../UI/CustomButton";

export default function Dona(props) {  
  return (
    <Fragment>
      <CustomButton
        src={"/img/dona.png"}
        hover_src={"/img/dona.png"}
        w={10}
        h={10}
        resp_w={props.mobile ? "20vw" : "6.5vw"}
        type="external"
        href="https://ko-fi.com/labestiaradiocdmx"
        button_class={props.mobile ? styles.dona_mobile : styles.dona}
      />
    </Fragment>
  );
}
