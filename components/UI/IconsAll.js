import styles from "./IconsAll.module.css";
import Icon from "./Icon";
import Modal from "./Modal";

import { useState, useRef, useEffect } from "react";

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

const modalHandler = (type) => {
  setModalIsActive(true);
  setModalType(type);
};
const hideModalHandler = () => {
  setModalIsActive(false);
  setModalType(null);
};

const IconsAll = (props) => {
  const [modalIsActive, setModalIsActive] = useState(false);
  const [modalType, setModalType] = useState(null);
  const ref = useRef();
  useOnClickOutside(ref, () => setModalIsActive(false));
  

  let content = 
    <span>
      {modalIsActive && (
        <Modal
          type={modalType}
          ref={ref}
          onHideModal={hideModalHandler}
          wallpaperFolder={props.wallpaperFolder}
          wallpaperCount={props.wallpaperCount}
          custom_names={props.customWallpaperNames}
        />
      )} 
      <div className={styles.icons_desktop}>
        <div className={styles.box}>
          <Icon
            type="link"
            link="https://www.ko-fi.com/labestiaradiocdmx"
            img="icon-dona"
            title="Dona"
          />
          <Icon
            type="link"
            link="https://labestiaradio.com/radioteca"
            img="icon-radioteca"
            title="Radioteca"
          />
          <Icon
            type="button"
            img="icon3"
            title="Pacta Con La Bestia"
            onClickTrigger={modalHandler.bind(null, "1")}
          />
          <Icon
            type="button"
            img="icon4"
            title="Rola Una Rola"
            onClickTrigger={modalHandler.bind(null, "2")}
          />
        </div>
      </div>
      <div className={styles.icons_mobile}>
      <div className={styles.box}>
        {/*<Icon
        type="link"
        link="#la-bestia-tv"
        img="icon1"
        title="La Bestia TV"
        />
        <Icon
        type="link"
        link="#twitch-y-chat"
        img="icon2"
        title="Twitch Y Chat"
        />*/}
        <Icon
        type="button"
        img="icon3"
        title="Pacta Con La Bestia"
        onClickTrigger={modalHandler.bind(null, "1")}
        />
        <Icon
        type="button"
        img="icon4"
        title="Rola Una Rola"
        onClickTrigger={modalHandler.bind(null, "2")}
        />
        {/*<Icon
        type="button"
        img="icon5"
        title="Las Más Sonaditas"
        onClickTrigger={winampHandler}
        />
        <Icon
        type="link"
        target="_blank"
        link="https://www.somoslabestia.com/shop-1"
        img="icon9"
        title="Merch"
        />
        <Icon
        type="link"
        link="https://www.bose.mx/es_mx/index.html"
        img="icon-bose"
        title="Bose"
        />*/}
        <Icon
        type="link"
        link="https://www.ko-fi.com/labestiaradiocdmx"
        img="icon-dona"
        title="Dona"
        />
        <Icon
        type="link"
        link="https://labestiaradio.com/radioteca"
        img="icon-radioteca"
        title="Radioteca"
        />
        <Icon
        type="button"
        img="icon-wallpaper"
        title="Cambia Tu Wallpaper"
        onClickTrigger={modalHandler.bind(null, "3")}
        />
        {/*<Icon
        type="link"
        link="https://www.eventbrite.com/e/la-bestia-presenta-ruido-en-casa-mengers-kexp-dj-set-tickets-579796144877"
        img="RUIDOENCASA"
        title="Ruido en Casa"
        />*/}
      </div>
    </div>
  </span>
  return content;
};

export default IconsAll;
