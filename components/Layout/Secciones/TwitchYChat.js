import Section from "../../UI/Section";
import styles from "./TwitchYChat.module.css";
import { Fragment } from "react";

export default function TwitchYChat(props) {
  
  return (
    <Fragment>
      <Section
        id="twitch_y_chat"
        titulo="/img/titulos/twitch.png"
        mobile={props.mobile}
      >
        <div className={props.mobile ? "" : "row"}>
          <div class={props.mobile ? styles.twitch_mobile : styles.twitch}>
            <iframe
              src="https://player.twitch.tv/?channel=labestiaradio&parent=labestiaradio.com&parent=www.labestiaradio.com&parent=bestia-radio.vercel.app"
              frameBorder="0"
              allowFullScreen={true}
              scrolling="no"
              height="378"
              width="100%"
            />
          </div>
          <div class={props.mobile ? styles.twitch_mobile : styles.twitch}>
            <iframe
              src="https://www.twitch.tv/embed/labestiaradio/chat?parent=labestiaradio.com&parent=www.labestiaradio.com&parent=bestia-radio.vercel.app"
              height="378"
              width="100%"
            />
          </div>
        </div>
      </Section>
    </Fragment>
  );
}
