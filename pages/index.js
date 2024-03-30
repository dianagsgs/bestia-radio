import Head from "next/head";
import Script from "next/script";
import styles from "../styles/index.module.scss";
import Banner from "../components/UI/Banner";
import HeadContent from "../components/Layout/HeadContent";
import TwitchYChat from "../components/Layout/Secciones/TwitchYChat";
import Programacion from "../components/Layout/Secciones/Programacion";
import Editorial from "../components/Layout/Secciones/Editorial";
import Sesiones from "../components/Layout/Secciones/Sesiones";
import Dona from "../components/UI/Dona/Dona";
import Eventos from "../components/Layout/Secciones/Eventos";
import Quees from "../components/Layout/Secciones/Quees";
import PageBackground from "../components/Layout/PageBackground/PageBackground";
import { Analytics } from "@vercel/analytics/react";
import { Footer } from "../components/Layout/Footer/Footer";
import SponsorAd from "../components/UI/SponsorAd/SponsorAd";
import Nav from "../components/Layout/Nav/Nav";

export default function Home(props) {
  let mobile = props.windowSize === "small";

  return (
    <div>
      <Head>
        <title>La Bestia Radio</title>
        <HeadContent />
      </Head>
      <main>
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
        <Nav />
        <SponsorAd />
        <Dona />
        <PageBackground>
          <Banner mobile={mobile} />
          {/* SECCIONES */}
          <div class={styles.homeContainer}>
            <TwitchYChat mobile={mobile} />
            <Editorial mobile={mobile} />
            <Eventos mobile={mobile} />
            <Sesiones mobile={mobile} />
            <Programacion mobile={mobile} />
            <Quees mobile={mobile} />
          </div>

          <Footer />
          <Analytics />
        </PageBackground>
      </main>
    </div>
  );
}
