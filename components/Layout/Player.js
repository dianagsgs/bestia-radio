import Image from "next/image";
import CustomImage from "../UI/CustomImage";
import Radio from "../UI/Radio";
import Redes from "../UI/Redes";
import styles from "./Player.module.scss";

export default function Player(props) {
  return (
    <div className={styles.radioPlayer}>
      <div className={styles.radioPlayerLive}>
        <Image
          src="/img/player/menu-live.jpg"
          width={420}
          height={80}
          className={styles.radioPlayerLiveImg}
        />
      </div>
      {/* <div
        className="radioplayer"
        data-src="https://streams.radio.co/s4aaec47cd/listen"
        data-playbutton="true"
        data-volumeslider={props.mobile ? "false" : "true"}
        data-elapsedtime="false"
        data-nowplaying="true"
        data-showplayer="false"
      /> */}
      {/* <Radio /> */}
      {props.mobile ? (
        <span />
      ) : (
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
      )}
    </div>
  );
}
