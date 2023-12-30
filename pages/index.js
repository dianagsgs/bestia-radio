import Head from "next/head";
import Script from "next/script";
import styles from "../styles/index.module.css";

import Banner from "../components/UI/Banner";
import Fade from "react-reveal";
import Flip from "react-reveal";

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
         
        <Banner mobile={mobile}/>

        <Player mobile={mobile}/>

        <Menu home={true} mobile={mobile}/>

        <Dona mobile={mobile}/>

        {/* SECCIONES */}
        <Flip top>
          <TwitchYChat mobile={mobile} />
        </Flip>

        <Editorial mobile={mobile} />

        <Fade left>
          <Eventos mobile={mobile} />
        </Fade>
        
        {/*<Radioteca mobile={mobile} />*/}

        <Fade right>
          <Sesiones mobile={mobile} />
        </Fade>
        <Fade left>
          <Programacion mobile={mobile} />
        </Fade>
        <Fade right>
          <Quees mobile={mobile} />
        </Fade>
      </main>
    </div>
  );
}
