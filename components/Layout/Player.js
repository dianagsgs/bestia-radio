import CustomImage from "../UI/CustomImage";
import CustomButton from "../UI/CustomButton";
import Radio from "../UI/Radio";
import styles from "./Player.module.css";
import { Fragment } from "react";

export default function Player(props) {  
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

            <CustomButton
              src="/img/player/redes/insta.png"
              hover_src="/img/player/redes/insta.png"
              w={10}
              h={10}
              resp_w="2.5vw"
              type="external"
              href="https://www.instagram.com/labestiaradiomx/"
              button_class={styles.insta}
            />
            <CustomButton
              src="/img/player/redes/face.png"
              hover_src="/img/player/redes/face.png"
              w={10}
              h={10}
              resp_w="2.5vw"
              type="external"
              href="https://www.facebook.com/labestiaradiomx/"
              button_class={styles.face}
            />
            <CustomButton
              src="/img/player/redes/spoti.png"
              hover_src="/img/player/redes/spoti.png"
              w={10}
              h={10}
              resp_w="2.5vw"
              type="external"
              href="https://open.spotify.com/playlist/7awX75pQJ7YGV75mReBsrU"
              button_class={styles.spoti}
            />
            <CustomButton
              src="/img/player/redes/icon.png"
              hover_src="/img/player/redes/icon.png"
              w={10}
              h={10}
              resp_w="2.5vw"
              type="external"
              href="https://www.somoslabestia.com"
              button_class={styles.icon}
            />
          </span>
        }
    </Fragment>
  );
}
