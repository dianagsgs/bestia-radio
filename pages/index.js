import Head from "next/head";
import Script from "next/script";
import styles from "../styles/index.module.css";

import Banner from "../components/UI/Banner";

import HeadContent from "../components/Layout/HeadContent";
import Menu from "../components/Layout/Menu";
import TwitchYChat from "../components/Layout/TwitchYChat";
import Radioteca from "../components/Layout/Radioteca";
import Programacion from "../components/Layout/Programacion";
import Editorial from "../components/Layout/Editorial";
import Sesiones from "../components/Layout/Sesiones";
import Dona from "../components/Layout/Dona";
import Eventos from "../components/Layout/Eventos";
import Quees from "../components/Layout/Quees";

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
         
        <Banner mobile={mobile}/>

        <Menu home={true} mobile={mobile}/>

        <TwitchYChat mobile={mobile} background_num={props.randomBackground}/>

        {/* Might change: */}
        <Editorial mobile={mobile} background_num={props.randomBackground}/>
        
        <Eventos mobile={mobile} background_num={props.randomBackground}/>
        <Radioteca mobile={mobile} background_num={props.randomBackground}/>
        <Sesiones mobile={mobile} background_num={props.randomBackground}/>
        <Programacion mobile={mobile} background_num={props.randomBackground}/>
        
        {/* Might change: */}
        <Quees mobile={mobile} background_num={props.randomBackground}/>

      </main>
    </div>
  );
}
