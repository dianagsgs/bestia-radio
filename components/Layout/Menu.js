import { Fragment, useEffect, useRef, useState } from "react";
import Dynamic from "next/dynamic";
import Link from "next/link";
import Clock from "../UI/Clock";
import MenuThemes from "./MenuThemes";
import MenuPodcasts from "./MenuPodcasts";
import styles from "./Menu.module.css";
import Image from "next/dist/client/image";

const Radio = Dynamic(() => import("../UI/Radio"), { ssr: false });

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

const Menu = (props) => {
  const [menuActive, setMenuActive] = useState(false);
  const [submenuActive, setSubmenuActive] = useState(null);
  const ref = useRef();

  useOnClickOutside(ref, () => setMenuActive(false));
  const menuHandler = () => {
    setMenuActive((state) => !state);
  };

  let mobile = props.windowSize === "small";

  return (
    <Fragment>
      <div className={mobile ? styles.menu_mobile : styles.menu_desktop}>
        <Image width="140" height="90" src="/img/logo.png"></Image>
        <div className="radio_box">
          <div className="radio_player">
            <span
              className="radioplayer"
              data-src="https://streams.radio.co/s4aaec47cd/listen"
              data-playbutton="true"
              data-volumeslider="false"
              data-elapsedtime="false"
              data-nowplaying="true"
              data-showplayer="false"
            ></span>
          </div>
          <Radio />
        </div>
      </div>
    </Fragment>
  );
};

export default Menu;
