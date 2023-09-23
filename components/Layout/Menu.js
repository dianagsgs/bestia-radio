import { Fragment, useEffect, useRef, useState } from "react";
import Dynamic from "next/dynamic";
import styles from "./Menu.module.css";
import CustomButton from "../UI/CustomButton";
import CustomImage from "../UI/CustomImage";

const Radio = Dynamic(() => import("../UI/Radio"), { ssr: false });

const Menu = (props) => {
  let mobile = props.windowSize === "small";
  let sections = [
    ["Twitch","#twitch_y_chat",styles.twitch],
    ["Radioteca","#radioteca",styles.radioteca],
    ["Programación","#programacion",styles.programacion],
    ["Locutores","#locutores",styles.locutores],
    ["Editorial","#editorial",styles.editorial],
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
          h={190}
          resp_w={"9vw"}
          type="home"
          button_class={styles.logo}
        />

        <CustomImage
          resp_w="13vw"
          src="/img/player/player_base.png"
          w="83"
          h="75"
          id="player"
          class={styles.player}
        />
        <span
          className="radioplayer"
          data-src="https://streams.radio.co/s4aaec47cd/listen"
          data-playbutton="true"
          data-volumeslider="false"
          data-elapsedtime="false"
          data-nowplaying="true"
          data-showplayer="false"
        ></span>

        <Radio/>
     

        {getMenuItems()}
      </div>
    </Fragment>
  );
};

export default Menu;
