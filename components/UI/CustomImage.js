import styles from "./CustomImage.module.css";
import { Fragment } from "react";

import Image from "next/image";

export default function CustomImage(props) {
  let the_style = {"width":props.resp_w};
  if (props.position !== undefined) {
    the_style["top"] = props.position["top"];
    the_style["left"] = props.position["left"];
  }
  return (
    <Fragment>
      <div className={props.class} style={the_style}>
        <Image
          src={props.src}
          width={props.w}
          height={props.h}
          layout="responsive"
          alt={props.alt}
          id={props.id}
          onClick={props.onclick}
          priority
        />
      </div>
    </Fragment>
  );
}
