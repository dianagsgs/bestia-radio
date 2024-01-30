import Head from "next/head";
import Script from "next/script";
import styles from "../styles/index.module.scss";
import Banner from "../components/UI/Banner";
import HeadContent from "../components/Layout/HeadContent";
import Menu from "../components/Layout/Menu";
import TwitchYChat from "../components/Layout/Secciones/TwitchYChat";
// import Radioteca from "../components/Layout/Secciones/Radioteca";
import Programacion from "../components/Layout/Secciones/Programacion";
import Editorial from "../components/Layout/Secciones/Editorial";
import Sesiones from "../components/Layout/Secciones/Sesiones";
import Dona from "../components/Layout/Dona";
import Eventos from "../components/Layout/Secciones/Eventos";
import Quees from "../components/Layout/Secciones/Quees";
import Player from "../components/Layout/Player";
import Redes from "../components/UI/Redes";

export default function Home(props) {
  let mobile = props.windowSize === "small";

  return (
    <div>
      <Head>
        <title>La Bestia Radio</title>
        <HeadContent />
      </Head>

      <main style={props.background_style}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7SYHST9BWV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-7SYHST9BWV');
        `}
        </Script>

        <Banner mobile={mobile} />

        <div className={styles.headerContainer}>
          <Menu home={true} mobile={mobile} />
          <Player mobile={mobile} />
        </div>

        <Dona mobile={mobile} />

        {/* SECCIONES */}
        <div class={styles.sections_container}>
          <TwitchYChat mobile={mobile} />

          <Editorial mobile={mobile} />

          <Eventos mobile={mobile} />

          {/*<Radioteca mobile={mobile} />*/}

          <Sesiones mobile={mobile} />
          <Programacion mobile={mobile} />
          <Quees mobile={mobile} />
        </div>

        {mobile ? (
          <div class={styles.redes_container}>
            <Redes
              styles_insta={styles.insta}
              styles_face={styles.face}
              styles_youtube={styles.youtube}
              styles_twitch={styles.twitch}
              styles_tiktok={styles.tiktok}
              styles_whats={styles.whats}
              mobile={mobile}
            />
          </div>
        ) : (
          <span />
        )}
      </main>
    </div>
  );
}
