import { Fragment, useEffect, useRef, useState } from "react";
import Dynamic from "next/dynamic";
import styles from "./Menu.module.css";
import CustomButton from "../UI/CustomButton";
import CustomImage from "../UI/CustomImage";

const Radio = Dynamic(() => import("../UI/Radio"), { ssr: false });

const Menu = (props) => {
  let mobile = props.mobile;
  let sections = [
    ["dona","https://ko-fi.com/labestiaradiocdmx",mobile ? styles.dona_mobile : styles.dona],// ["dona","#dona",styles.dona],
    ["tienda","https://www.somoslabestia.com/shop-1",mobile ? styles.tienda_mobile : styles.tienda],
    ["editorial","#editorial",mobile ? styles.editorial_mobile : styles.editorial],
    ["eventos","#eventos",mobile ? styles.eventos_mobile : styles.eventos],
    ["radioteca","#radioteca",mobile ? styles.radioteca_mobile : styles.radioteca],
    ["sesiones","#sesiones",mobile ? styles.sesiones_mobile : styles.sesiones],
    ["programacion","#programacion",mobile ? styles.programacion_mobile : styles.programacion],
    ["locutores","/locutores",mobile ? styles.locutores_mobile : styles.locutores],
    ["quees","#quees",mobile ? styles.quees_mobile : styles.quees]
  ];
  const [visible, setVisible] = useState(false);

  const getMenuItems = () => {
    let items = []
    for(let i = 0; i < sections.length; i++) {
      let item =
        <CustomButton
          src={"/img/menu/menu_"+sections[i][0]+".png"}
          hover_src={"/img/menu/menu_"+sections[i][0]+".png"}
          section_id={sections[i][0]}
          w={10}
          h={mobile ? 2.5 : 1.5}
          resp_w={mobile ? "30vw" : "10vw"}
          type={
            sections[i][1].startsWith("https://") ? "external" : 
            sections[i][1].startsWith("#") ? "scroll" : "internal"
          }
          href={sections[i][1]}
          button_class={sections[i][2] +" "+ (mobile ? styles.menu_item_mobile : styles.menu_item)}
        />;
      items.push(item);
    }
    return items;
  }

  let admin = false;
  const toggleAdminMode = () => {
    admin = !admin;
    console.log(admin);
  };

  const openMenu = () => {
    setVisible(!visible);
  }

  return (
    <Fragment>
      <div className={mobile ? styles.menu_mobile : styles.menu_desktop}>
        <CustomButton
          src={mobile ? "/img/logo_mobile.png" : "/img/logo.png"}
          hover_src={mobile ? "/img/logo_mobile.png" : "/img/logo.png"}
          w={140}
          h={mobile ? 140 : 190}
          resp_w={mobile ? "15vw" : "9vw"}
          type="home"
          button_class={mobile ? styles.logo_mobile : styles.logo_desktop}
        />

        <CustomImage
          resp_w={mobile ? "100vw" : "13vw"}
          src={mobile ? "/img/player/player_mobile.png" : "/img/player/player_base.png"}
          w="83"
          h={mobile ? "10" : "75"}
          id="player"
          class={mobile ? styles.player_mobile : styles.player_desktop}
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

        {props.home ? 
          <span>
            <div class={mobile ? (visible ? styles.menu_container : styles.invisible) : ""}>
              {getMenuItems()}
            </div>
            {mobile ? <CustomButton
              src={"/img/menu/menu_mobile.png"}
              hover_src={"/img/menu/menu_mobile.png"}
              w={100}
              h={30}
              resp_w={"16vw"}
              type="action"
              actionClickHandler={openMenu}
              button_class={styles.menu_button}
            /> : <span/>}
          </span>
          : <span/>
        }

        {/*<span onClick={() => toggleAdminMode()}>
          admin
        </span>*/}
      </div>
    </Fragment>
  );
};

export default Menu;
