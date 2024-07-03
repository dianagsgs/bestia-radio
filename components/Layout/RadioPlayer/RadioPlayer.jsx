import styles from "./RadioPlayer.module.scss";
import Radio from "../../UI/Radio";

const RadioPlayer = () => {
  return (
    <div className={styles.radioPlayerContainer}>
      <div
        className="radioplayer"
        data-src="https://streams.radio.co/s4aaec47cd/listen"
        data-playbutton="true"
        data-volumeslider="true"
        data-elapsedtime="false"
        data-nowplaying="true"
        data-showplayer="false"
      />
      <Radio />
    </div>
  );
};

export default RadioPlayer;
