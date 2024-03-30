import Image from "next/image";
import styles from "./Nav.module.scss";
import Link from "next/link";
import RadioPlayer from "../RadioPlayer/RadioPlayer";
import { useState } from "react";

const Nav = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className={styles.nav}>
        <div className={styles.navDesktop}>
          <div className={styles.navPlayer}>
            <div className={styles.navPlayerLive}>
              <Image
                src="/img/player/menu-live.jpg"
                width={420}
                height={80}
                className={styles.navPlayerLiveImg}
              />
            </div>
            <div className={styles.navPlayerPlayer}>
              <RadioPlayer />
            </div>
          </div>
          <div className={styles.navSocial}>
            <div className={styles.navSocialItem}>
              <Link
                href="https://www.instagram.com/labestiaradiomx/"
                target="_blank"
              >
                <Image
                  src="/img/social/instagram.png"
                  width={150}
                  height={150}
                  className={styles.navSocialItemImg}
                />
              </Link>
            </div>
            <div className={styles.navSocialItem}>
              <Link
                href="https://www.facebook.com/labestiaradiomx/"
                target="_blank"
              >
                <Image
                  src="/img/social/facebook.png"
                  width={150}
                  height={150}
                  className={styles.navSocialItemImg}
                />
              </Link>
            </div>
            <div className={styles.navSocialItem}>
              <Link
                href="https://www.youtube.com/@LaBestiaRadio"
                target="_blank"
              >
                <Image
                  src="/img/social/youtube.png"
                  width={150}
                  height={150}
                  className={styles.navSocialItemImg}
                />
              </Link>
            </div>
            <div className={styles.navSocialItem}>
              <Link href="https://www.twitch.tv/labestiaradio" target="_blank">
                <Image
                  src="/img/social/twitch.png"
                  width={150}
                  height={150}
                  className={styles.navSocialItemImg}
                />
              </Link>
            </div>
            <div className={styles.navSocialItem}>
              <Link href="https://www.tiktok.com/@labestia.666" target="_blank">
                <Image
                  src="/img/social/tiktok.png"
                  width={150}
                  height={150}
                  className={styles.navSocialItemImg}
                />
              </Link>
            </div>
            <div className={styles.navSocialItem}>
              <Link href="https://wa.me/5624698330" target="_blank">
                <Image
                  src="/img/social/whatsapp.png"
                  width={150}
                  height={150}
                  className={styles.navSocialItemImg}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
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
            <div className={styles.newMenuDesktopItems}>
              <Link href="https://www.somoslabestia.com/shop-1" target="_blank">
                <span className={styles.newMenuDesktopItem}>TIENDA</span>
              </Link>
              <Link href="#ruidodeldia" className={styles.newMenuDesktopItem}>
                <span className={styles.newMenuDesktopItem}>RUIDO DEL DÍA</span>
              </Link>
              <Link href="#portada" className={styles.newMenuDesktopItem}>
                <span className={styles.newMenuDesktopItem}>PORTADA</span>
              </Link>
              <Link href="#raro" className={styles.newMenuDesktopItem}>
                <span className={styles.newMenuDesktopItem}>RARO</span>
              </Link>
              <Link
                href="#soloparaadultos"
                className={styles.newMenuDesktopItem}
              >
                <span className={styles.newMenuDesktopItem}>S.P.A.</span>
              </Link>
              <Link href="#vacalado" className={styles.newMenuDesktopItem}>
                <span className={styles.newMenuDesktopItem}>VA CALADO</span>
              </Link>
              <Link href="#eventos" className={styles.newMenuDesktopItem}>
                <span className={styles.newMenuDesktopItem}>EVENTOS</span>
              </Link>
              <Link href="#sesiones" className={styles.newMenuDesktopItem}>
                <span className={styles.newMenuDesktopItem}>SESIONES</span>
              </Link>
              <Link href="#programacion" className={styles.newMenuDesktopItem}>
                <span className={styles.newMenuDesktopItem}>PROGRAMACIÓN</span>
              </Link>
              <Link href="/" className={styles.newMenuDesktopItem}>
                <span className={styles.newMenuDesktopItem}>QUÉ ES LBR?</span>
              </Link>
            </div>
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
              <div
                className={styles.burger}
                onClick={() => setVisible(!visible)}
              >
                <Image
                  src="/img/menu/menu-burger.png"
                  width={118}
                  height={28}
                  className={styles.burgerImg}
                />
              </div>
            </div>
          </div>
          <div className={styles.newMenuMobilePlayer}>
            <RadioPlayer />
          </div>
          {visible && (
            <div className={styles.newMenuMobileItems}>
              <div className={styles.newMenuMobileItems}>
                <Link
                  href="https://www.somoslabestia.com/shop-1"
                  target="_blank"
                >
                  <span className={styles.newMenuMobileItem}>TIENDA</span>
                </Link>
                <Link href="#ruidodeldia" className={styles.newMenuMobileItem}>
                  <span className={styles.newMenuMobileItem}>
                    RUIDO DEL DÍA
                  </span>
                </Link>
                <Link href="#portada" className={styles.newMenuMobileItem}>
                  <span className={styles.newMenuMobileItem}>PORTADA</span>
                </Link>
                <Link href="#raro" className={styles.newMenuMobileItem}>
                  <span className={styles.newMenuMobileItem}>RARO</span>
                </Link>
                <Link
                  href="#soloparaadultos"
                  className={styles.newMenuMobileItem}
                >
                  <span className={styles.newMenuMobileItem}>S.P.A.</span>
                </Link>
                <Link href="#vacalado" className={styles.newMenuMobileItem}>
                  <span className={styles.newMenuMobileItem}>VA CALADO</span>
                </Link>
                <Link href="#eventos" className={styles.newMenuMobileItem}>
                  <span className={styles.newMenuMobileItem}>EVENTOS</span>
                </Link>
                <Link href="#sesiones" className={styles.newMenuMobileItem}>
                  <span className={styles.newMenuMobileItem}>SESIONES</span>
                </Link>
                <Link href="#programacion" className={styles.newMenuMobileItem}>
                  <span className={styles.newMenuMobileItem}>PROGRAMACIÓN</span>
                </Link>
                <Link href="/" className={styles.newMenuMobileItem}>
                  <span className={styles.newMenuMobileItem}>QUÉ ES LBR?</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Nav;
