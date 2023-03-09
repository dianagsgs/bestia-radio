import { Fragment, useEffect, useRef, useState } from "react";
import Dynamic from "next/dynamic";
import Link from "next/link";
import Clock from "../UI/Clock";
import MenuThemes from "./MenuThemes";
import MenuPodcasts from "./MenuPodcasts";
import styles from "./Menu.module.css";

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
      <div className={styles.menu_desktop}>
        <img
          src="/img/menu/left.png"
          className={styles.logo}
          alt="La Bestia Menú"
          onClick={menuHandler}
        />
        <img
          src="/img/menu/right.jpg"
          className={styles.clock_box}
          alt="Reloj"
        />
        <div className="radio_box">
          <div className="radio_player">
            <span
              className="radioplayer"
              data-src="https://streams.radio.co/s4aaec47cd/listen"
              data-playbutton="true"
              data-volumeslider="true"
              data-elapsedtime="false"
              data-nowplaying="true"
              data-showplayer="false"
            ></span>
          </div>
          <Radio />
        </div>

        {/** Note right now mobile has display none so social icons only appear in desktop */}
        <div className={mobile ? styles.social_mobile : styles.social}>
          <Link href="https://www.instagram.com/labestiaradiomx/">
            <a>
              <img src="/img/menu/social1.png" alt="Instagram de La Bestia" />
            </a>
          </Link>
          <Link href="https://www.facebook.com/labestiaradiomx">
            <a>
              <img src="/img/menu/social2.png" alt="Facebook de La Bestia" />
            </a>
          </Link>
        </div>

        <Clock />
        {menuActive && (
          <div className={styles.hidden} ref={ref}>
            <div className={styles.head}>
              <img src="/img/menu/head.png" alt="La Bestia Menú" />
            </div>
            <div className={styles.content}>
              <div className="row p-0 m-0">
                <div className={`col-6 p-0 m-0 ${styles.left}`}>
                  <div
                    className={styles.menu_item}
                    onClick={() => {
                      setSubmenuActive(1);
                    }}
                  >
                    <img src="/img/menu/icon1.jpg" alt="Cambia tu wallpaper" />
                    Cambia tu wallpaper
                    <span className={styles.arrow}>
                      <img src="/img/menu/arrow.png" />
                    </span>
                  </div>
                  <div>
                    <a
                      href="https://labestiaradio.com/radioteca"
                      target="_blank"
                      rel="noreferrer"
                      className={styles.menu_item}
                    >
                      <img src="/img/menu/icon2.jpg" alt="Podcasts" />
                      Radioteca
                      <span className={styles.arrow}>
                        <img src="/img/menu/arrow.png" />
                      </span>
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://www.youtube.com/channel/UCIFMfmZ2OwY8cSmE0P-IMPQ"
                      target="_blank"
                      rel="noreferrer"
                      className={styles.menu_item}
                    >
                      <img src="/img/menu/icon3.jpg" alt="La Bestia TV" />
                      La Bestia TV
                      <span className={styles.arrow}>
                        <img src="/img/menu/arrow.png" />
                      </span>
                    </a>
                  </div>
                  <div
                    className={styles.menu_item}
                    onClick={() => {
                      setSubmenuActive(3);
                    }}
                  >
                    <img src="/img/menu/icon4.jpg" alt="Merch" />
                    Merch
                    <span className={styles.arrow}>
                      <img src="/img/menu/arrow.png" />
                    </span>
                  </div>
                  <div
                    className={styles.menu_item}
                    onClick={() => {
                      setSubmenuActive(4);
                    }}
                  >
                    <img src="/img/menu/icon5.jpg" alt="¿Quiénes somos?" />
                    ¿Quiénes somos?
                    <span className={styles.arrow}>
                      <img src="/img/menu/arrow.png" />
                    </span>
                  </div>
                  <div>
                    <Link href="/aviso-de-privacidad">
                      <a className={styles.menu_item}>
                        Aviso de Privacidad
                        <span className={styles.arrow}>
                          <img src="/img/menu/arrow.png" />
                        </span>
                      </a>
                    </Link>
                  </div>
                </div>
                <div className={`col-6 p-0 m-0 ${styles.right}`}>
                  {submenuActive === 1 && (
                    <div className={styles.menu_box}>
                      <MenuThemes
                        folder={props.wallpaperFolder}
                        count={props.wallpaperCount}
                        custom_names={props.custom_names}
                      />
                    </div>
                  )}
                  {submenuActive === 2 && (
                    <div className={styles.menu_box}>
                      <div className={styles.menu_box_item}>
                        <MenuPodcasts />
                      </div>
                    </div>
                  )}
                  {submenuActive === 3 && (
                    <div className={styles.menu_box}>
                      <div className={styles.menu_box_item}>
                        <a
                          href="https://www.somoslabestia.com/product-page/milo-bestia"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img src="/img/menu/icon4.jpg" />
                          Milo Bestia
                        </a>
                      </div>
                      <div className={styles.menu_box_item}>
                        <a
                          href="https://www.somoslabestia.com/product-page/la-bestia-houdini"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img src="/img/menu/icon4.jpg" />
                          La Bestia Houdini
                        </a>
                      </div>
                    </div>
                  )}
                  {submenuActive === 4 && (
                    <div className={styles.menu_box}>
                      <p>
                        Desde su fundación en 2020, La Bestia Radio no sólo se
                        ha dado a conocer gracias a sus rituales satánicos y
                        partidas de ouija con músicos fallecidos por sobredosis
                        en los años 90, sino también por ser la nueva estación
                        de rock alternativo de La CDMX.
                      </p>
                      <p>
                        Entre nuestros locutores se encuentran algunos de los
                        músicos que más ruido hacen en la ciudad más grande y
                        ruidosa del mundo.
                      </p>
                      <p>
                        Junto al staff de La Bestia Music Inc. se encargan de
                        curar a mano una finísima selección musical de rock
                        alternativo que nadie conoce.
                      </p>
                      <p>
                        La Bestia Radio se mantiene independiente y no se vende…
                        porque nadie la quiere comprar.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={`${styles.menu_desktop} ${styles.menu_mobile}`}>
        <div className="radio_box">
          <div className="radio_player">
            <span
              className="radioplayer"
              data-src="https://streams.radio.co/s4aaec47cd/listen"
              data-playbutton="true"
              data-volumeslider="true"
              data-elapsedtime="false"
              data-nowplaying="true"
              data-showplayer="false"
            ></span>
          </div>
          <Radio />
        </div>
        <div className={styles.social_mobile}>
          <Link href="https://www.instagram.com/labestiaradiomx/">
            <a>
              <img src="/img/menu/social1.png" alt="Instagram de La Bestia" />
            </a>
          </Link>
          <Link href="https://www.facebook.com/labestiaradiomx">
            <a>
              <img src="/img/menu/social2.png" alt="Facebook de La Bestia" />
            </a>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Menu;
