import styles from "./TwitchYChat.module.css";
import { Fragment } from "react";
import Section from "./Section"


export default function TwitchYChat(props) {
  
  return (
    <Fragment>
      <Section
        id="twitch_y_chat"
        titulo="/img/titulos/twitch.png"
      >
        <div className="row">
            <div className="col-lg-6">
              <iframe
                src="https://player.twitch.tv/?channel=labestiaradio&parent=labestiaradio.com&parent=www.labestiaradio.com&parent=bestia-radio.vercel.app"
                frameBorder="0"
                allowFullScreen={true}
                scrolling="no"
                height="378"
                width="100%"
              ></iframe>
            </div>
            <div className="col-lg-6">
              <iframe
                src="https://www.twitch.tv/embed/labestiaradio/chat?parent=labestiaradio.com&parent=www.labestiaradio.com&parent=bestia-radio.vercel.app"
                height="378"
                width="100%"
              ></iframe>
            </div>
          </div>
      </Section>
    </Fragment>
  );
}
