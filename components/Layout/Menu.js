import { Fragment, useEffect, useRef, useState } from "react";
import Dynamic from "next/dynamic";
import styles from "./Menu.module.css";
import CustomImage from "../UI/CustomImage";
import CustomButton from "../UI/CustomButton";

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

        <CustomImage
          resp_w="9vw"
          src="/img/logo.png"
          w="140"
          h="90"
          id="logo"
          class={styles.logo}
        />;

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
          <Radio/>
        </div>

        <CustomButton
          src={"/img/dona.gif"}
          hover_src={"/img/dona.gif"}
          w={90}
          h={90}
          resp_w={"5vw"}
          type="action"
          href="https://ko-fi.com/labestiaradiocdmx"
          button_class={styles.dona}
        />


      </div>
    </Fragment>
  );
};

export default Menu;
