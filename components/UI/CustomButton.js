import styles from "./CustomButton.module.css";
import { useState } from "react";

import CustomImage from "./CustomImage";
import Link from "next/link";

export default function CustomButton(props) {

  const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);
  let sound = !props.mute;
  const [audio] = useState(typeof Audio !== "undefined" && new Audio(props.audio_src));

  const handleHover = (setTo) => {
    setHover(setTo);
    if (sound && setTo) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  const handleClick = (setTo) => {
    if (props.clicked_src !== undefined) {
      setClicked(setTo);
    }
  }

  const handleClickScroll = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  }

  const openMenu = () => {
    console.log('toggle open menu');
  }

  const image =
    <CustomImage
      resp_w={props.resp_w}
      src={hover ? (clicked ? props.clicked_src : props.hover_src) : props.src}
      w={props.w}
      h={props.h}
      id={props.id}
    />;

  const getButton = () => {
    //type can be internal, external, home, scroll, action
    if(props.type === "home" || props.type === "internal") {
      // use Link, no target
      return(
        <Link
          href={props.type === "home" ? "/" : props.href}
          className={styles.customButton_container}
          style={{ "display": "block", "width": props.resp_w }}
        >
          <span
            className={styles.click_cursor}
            onMouseOver={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            onMouseDown={() => handleClick(true)}
            onMouseUp={() => handleClick(false)}
          >
            {image}
          </span>
        </Link>
      );
    } else if(props.type === "scroll"){
      return(
        <div
          onClick={() => handleClickScroll(props.section_id)}
        >
          {image}
        </div>
      );
    } else if(props.type === "action") {
        return(
          <div
            onClick={() => openMenu()}
          >
            {image}
          </div>
        );
    } else {
      // i.e. external, use a, target="_blank"
      return( 
        <a
          target="_blank" // don't open to new tab if moving within "same" domain
          href={props.href}
          className={styles.customButton_container}
          style={{ "display": "block", "width": props.resp_w }}
          onMouseOver={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
          onMouseDown={() => handleClick(true)}
          onMouseUp={() => handleClick(false)}
        >
          {image}
        </a>
      );
    }
  };
  return (
    <div className={props.button_class}>
      {getButton()}
    </div>
  );
}
