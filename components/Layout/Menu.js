import { Fragment, useEffect, useRef, useState } from "react";
import Dynamic from "next/dynamic";
import styles from "./Menu.module.css";
import CustomButton from "../UI/CustomButton";
import CustomImage from "../UI/CustomImage";

const Radio = Dynamic(() => import("../UI/Radio"), { ssr: false });

const Menu = (props) => {
  let mobile = props.windowSize === "small";
  let sections = [
    ["dona","https://ko-fi.com/labestiaradiocdmx",styles.dona],
    ["programacion","#programacion",styles.programacion],
    ["sesiones","#sesiones",styles.sesiones],
    ["eventos","#eventos",styles.eventos],
    ["locutores","/locutores",styles.locutores],
    ["radioteca","#radioteca",styles.radioteca],
    ["editorial","#editorial",styles.editorial],
    ["tienda","https://www.somoslabestia.com/shop-1",styles.tienda],
    ["quees","#quees",styles.quees]
  ];

  const getMenuItems = () => {
    let items = []
    for(let i = 0; i < sections.length; i++) {
      let item =
        <CustomButton
          src={"/img/menu/menu_"+sections[i][0]+".png"}
          hover_src={"/img/menu/menu_"+sections[i][0]+".png"}
          w={10}
          h={1.5}
          resp_w={"10vw"}
          type="internal"
          href={sections[i][1]}
          button_class={sections[i][2] +" "+ styles.menu_item}
        />;
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
          data-volumeslider="true"
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
