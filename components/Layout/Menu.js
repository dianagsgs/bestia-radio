import { useState } from "react";
import styles from "./Menu.module.scss";
import CustomButton from "../UI/CustomButton";
import Link from "next/link";
import Image from "next/image";

const Menu = (props) => {
  let mobile = props.mobile;
  let sections = [
    [
      "tienda",
      "https://www.somoslabestia.com/shop-1",
      mobile ? styles.tienda_mobile : styles.tienda,
    ],
    [
      "ruidodeldia",
      "#ruidodeldia",
      mobile ? styles.ruidodeldia_mobile : styles.ruidodeldia,
    ],
    ["portada", "#portada", mobile ? styles.portada_mobile : styles.portada],
    ["raro", "#raro", mobile ? styles.raro_mobile : styles.raro],
    [
      "soloparaadultos",
      "#soloparaadultos",
      mobile ? styles.soloparaadultos_mobile : styles.soloparaadultos,
    ],
    [
      "vacalado",
      "#vacalado",
      mobile ? styles.vacalado_mobile : styles.vacalado,
    ],
    ["eventos", "#eventos", mobile ? styles.eventos_mobile : styles.eventos],
    [
      "sesiones",
      "#sesiones",
      mobile ? styles.sesiones_mobile : styles.sesiones,
    ],
    [
      "programacion",
      "#programacion",
      mobile ? styles.programacion_mobile : styles.programacion,
    ],
    ["quees", "#quees", mobile ? styles.quees_mobile : styles.quees],
  ];
  const [visible, setVisible] = useState(false);

  const getMenuItems = () => {
    let items = [];
    for (let i = 0; i < sections.length; i++) {
      let item = (
        <CustomButton
          src={"/img/menu/menu_" + sections[i][0] + ".png"}
          hover_src={"/img/menu/menu_" + sections[i][0] + ".png"}
          section_id={sections[i][0]}
          w={10}
          h={mobile ? 1.7 : 1.5}
          resp_w={mobile ? "32vw" : "10vw"}
          type={
            sections[i][1].startsWith("https://")
              ? "external"
              : sections[i][1].startsWith("#")
              ? "scroll"
              : "internal"
          }
          href={sections[i][1]}
          button_class={
            sections[i][2] +
            " " +
            (mobile ? styles.menu_item_mobile : styles.menu_item)
          }
        />
      );
      items.push(item);
    }
    return items;
  };

  return (
    <div className={styles.newMenu}>
      <div className={styles.newMenuDesktopContainer}>
        <div className={styles.newMenuDesktop}>
          <Link href="/">
            <div className={styles.logo}>
              <Image
                src="/img/logo.png"
                width={457}
                height={624}
                className={styles.logoImg}
              />
            </div>
          </Link>
          <div className={styles.newMenuDesktopItems}>{getMenuItems()}</div>
        </div>
      </div>
      <div className={styles.newMenuMobileContainer}>
        <div className={styles.newMenuMobile}>
          <div className={styles.box}>
            <Link href="/">
              <div className={styles.name}>
                <Image
                  src="/img/menu/menu-logo.png"
                  width={177}
                  height={67}
                  className={styles.nameImg}
                />
              </div>
            </Link>
          </div>
          <div className={styles.box}>
            <Link href="/">
              <div className={styles.logo}>
                <Image
                  src="/img/logo_mobile.png"
                  width={131}
                  height={131}
                  className={styles.logoImg}
                />
              </div>
            </Link>
          </div>
          <div className={styles.box}>
            <div className={styles.burger} onClick={() => setVisible(!visible)}>
              <Image
                src="/img/menu/menu-burger.png"
                width={118}
                height={28}
                className={styles.burgerImg}
              />
            </div>
          </div>
        </div>
        {visible && (
          <div className={styles.newMenuMobileItems}>{getMenuItems()}</div>
        )}
      </div>
    </div>
  );
};

export default Menu;
