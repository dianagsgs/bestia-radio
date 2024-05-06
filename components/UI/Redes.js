// import styles from "./Redes.module.css";
import { Fragment } from "react";
import CustomButton from "./CustomButton";

export default function Redes(props) {
  const getRedesIcons = () => {
    const redes = [
      {
        icon_src: "insta.png",
        link: "https://www.instagram.com/labestiaradiomx/",
        class: props.styles_insta,
      },
      {
        icon_src: "face.png",
        link: "https://www.facebook.com/labestiaradiomx/",
        class: props.styles_face,
      },
      {
        icon_src: "youtube.png",
        link: "https://www.youtube.com/@LaBestiaRadio",
        class: props.styles_youtube,
      },
      {
        icon_src: "twitch.png",
        link: "https://www.twitch.tv/labestiaradio",
        class: props.styles_twitch,
      },
      {
        icon_src: "tiktok.png",
        link: "https://www.tiktok.com/@labestia.666",
        class: props.styles_tiktok,
      },
      {
        icon_src: "whats.png",
        link: "https://wa.me/5624698330",
        class: props.styles_whats,
      },
    ];
    const items = [];
    for (let i = 0; i < redes.length; i++) {
      let item = (
        <CustomButton
          src={"/img/player/redes/" + redes[i].icon_src}
          hover_src={"/img/player/redes/" + redes[i].icon_src}
          w={10}
          h={10}
          resp_w={props.mobile ? "10vw" : "3.2vw"}
          type="external"
          href={redes[i].link}
          button_class={redes[i].class}
        />
      );
      items.push(item);
    }
    return items;
  };
  return <Fragment>{getRedesIcons()}</Fragment>;
}
