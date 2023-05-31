import { Fragment, useEffect, useRef, useState } from "react";
import Dynamic from "next/dynamic";
import styles from "./Menu.module.css";
import CustomButton from "../UI/CustomButton";

const Radio = Dynamic(() => import("../UI/Radio"), { ssr: false });

const Menu = (props) => {
  let mobile = props.windowSize === "small";
  let sections = [
    ["Twitch","#twitch_y_chat",styles.twitch],
    ["Radioteca","#radioteca",styles.radioteca],
    ["Programación","#programacion",styles.programacion],
    ["Discos de la Semana","#discos_semana",styles.discos],
    ["Raro","#raro",styles.raro],
    ["Sesiones","#sesiones",styles.sesiones]
  ];

  const getMenuItems = () => {
    let items = []
    for(let i = 0; i < sections.length; i++) {
      let item =
        <div className={sections[i][2] +" "+ styles.menu_item} key={i}>
          <a href={sections[i][1]} className={styles.menu_link}>
            {sections[i][0]}
          </a>
        </div>;
      items.push(item);
    }
    return items;
  }

  return (
    <Fragment>
      <div className={mobile ? styles.menu_mobile : styles.menu_desktop}>
        <CustomButton
          src={"/img/logo.png"}
          hover_src={"/img/logo.png"}
          w={140}
          h={90}
          resp_w={"9vw"}
          type="home"
          button_class={styles.logo}
        />

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

        {getMenuItems()}
        
        <CustomButton
          src={"/img/dona.gif"}
          hover_src={"/img/dona.gif"}
          w={90}
          h={90}
          resp_w={"5vw"}
          type="external"
          href="https://ko-fi.com/labestiaradiocdmx"
          button_class={styles.dona}
        />
      </div>
    </Fragment>
  );
};

export default Menu;
