import CustomImage from "../UI/CustomImage";
import CustomButton from "../UI/CustomButton";
import Radio from "../UI/Radio";
import styles from "./Player.module.css";
import { Fragment } from "react";

export default function Player(props) {  

  const getRedesIcons = () => {
    const redes = [
      {
        icon_src: "insta.png",
        link: "https://www.instagram.com/labestiaradiomx/",
        class: styles.insta
      },
      {
        icon_src: "face.png",
        link: "https://www.facebook.com/labestiaradiomx/",
        class: styles.face
      },
      {
        icon_src: "youtube.png",
        link: "https://www.youtube.com/@LaBestiaRadio",
        class: styles.youtube
      },
      {
        icon_src: "twitch.png",
        link: "https://www.twitch.tv/labestiaradio",
        class: styles.twitch
      },
      {
        icon_src: "tiktok.png",
        link: "https://www.tiktok.com/@labestia.666",
        class: styles.tiktok
      },
      {
        icon_src: "whats.png",
        link: "https://wa.me/5624698330",
        class: styles.whats
      },
    ];
    const items = [];
    for (let i = 0; i < redes.length; i++){
      let item =
      <CustomButton
        src={"/img/player/redes/"+redes[i].icon_src}
        hover_src={"/img/player/redes/"+redes[i].icon_src}
        w={10}
        h={10}
        resp_w="3.2vw"
        type="external"
        href={redes[i].link}
        button_class={redes[i].class}
      />;
      items.push(item);
    }
    return items;
  };

  return (
    <Fragment>
      <CustomImage
          resp_w={props.mobile ? "100vw" : "100vw"}
          src={props.mobile ? "/img/player/player_mobile.png" : "/img/player/player_base.png"}
          w="83"
          h={props.mobile ? "10" : "5"}
          id="player"
          class={props.mobile ? styles.player_mobile : styles.player_desktop}
        />

        <span
          className="radioplayer"
          data-src="https://streams.radio.co/s4aaec47cd/listen"
          data-playbutton="true"
          data-volumeslider="true"
          data-elapsedtime="false"
          data-nowplaying="true"
          data-showplayer="false"
        ></span>

        <Radio/>

        {props.mobile ?
          <span/> :
          <span>
            <CustomImage
              resp_w="1.5vw"
              src="/img/player/player_speaker.png"
              w={10}
              h={10}
              class={styles.speaker}
            />
            {getRedesIcons()}
          </span>
        }
    </Fragment>
  );
}
