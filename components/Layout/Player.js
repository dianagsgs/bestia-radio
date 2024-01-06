import CustomImage from "../UI/CustomImage";
import Radio from "../UI/Radio";
import Redes from "../UI/Redes";
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
            <Redes
              styles_insta={styles.insta}
              styles_face={styles.face}
              styles_youtube={styles.youtube}
              styles_twitch={styles.twitch}
              styles_tiktok={styles.tiktok}
              styles_whats={styles.whats}
              mobile={props.mobile}
            />
          </span>
        }
    </Fragment>
  );
}
