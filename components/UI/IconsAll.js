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

const IconsAll = (props) => {
  const [modalIsActive, setModalIsActive] = useState(false);
  const [modalType, setModalType] = useState(null);
  const ref = useRef();
  useOnClickOutside(ref, () => setModalIsActive(false));

  const modalHandler = (type) => {
    setModalIsActive(true);
    setModalType(type);
  };
  const hideModalHandler = () => {
    setModalIsActive(false);
    setModalType(null);
  };

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
      <div className={props.mobile ? styles.icons_mobile : styles.icons_desktop}>
        <div className={styles.box}>
          <Icon
            type="link"
            link="https://www.amazon.com.mx/Online-Radio-La-Bestia/dp/B08VRFFV92"
            img="alexa"
            title="Instala LBR en tu Alexa"
            mobile={props.mobile}
          />
          <Icon
            type="button"
            img="icon3"
            title="Pacta Con La Bestia"
            onClickTrigger={modalHandler.bind(null, "1")}
            mobile={props.mobile}
          />
          <Icon
            type="button"
            img="icon4"
            title="Rola Una Rola"
            onClickTrigger={modalHandler.bind(null, "2")}
            mobile={props.mobile}
          />
          {props.mobile ?
            <Icon
              type="button"
              img="icon-wallpaper"
              title="Cambia Tu Wallpaper"
              onClickTrigger={modalHandler.bind(null, "3")}
              mobile={props.mobile}
            /> :
            <span/>
          }
          <Icon
            type="link"
            link="https://www.ko-fi.com/labestiaradiocdmx"
            img="icon-dona"
            title="Dona"
            mobile={props.mobile}
          />
          <Icon
            type="link"
            link="https://labestiaradio.com/radioteca"
            img="icon-radioteca"
            title="Radioteca"
            mobile={props.mobile}
          />
        </div>
      </div>
  </span>
  return content;
};

export default IconsAll;
