import Head from "next/head";
import Dynamic from "next/dynamic";
import Image from "next/image";
import HeadContent from "../components/Layout/HeadContent";
import Menu from "../components/Layout/Menu";
import IconsAll from "../components/UI/IconsAll";
import styles from "../styles/index.module.css";
import { useCallback, useEffect, useState } from "react";
import Script from "next/script";

import Banner from "../components/UI/Banner";

const Model = Dynamic(() => import("../components/UI/Model"), { ssr: false });
const Winamp = Dynamic(() => import("../components/UI/Winamp"), { ssr: false });

export default function Home(props) {
  const [winampIsActive, setWinampIsActive] = useState(false);
  const [error, setError] = useState(null);
  const [video1, setVideo1] = useState(null);
  const [video2, setVideo2] = useState(null);

  let mobile = props.windowSize === "small";

  const fetchVideosHandler = useCallback(async () => {
    try {
      const response = await fetch(
        "https://admin.labestiaradio.com/api/v1/youtube_videos"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      data.data.map((videosData) => {
        setVideo1(videosData.video_1);
        setVideo2(videosData.video_2);
      });
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchVideosHandler();
  }, [fetchVideosHandler]);

  const winampHandler = () => {
    setWinampIsActive(true);
  };

  const background_src = `url(/img/themes/${props.wallpaperFolder}/${props.randomWallpaper}.jpg)`;

  return (
    <div>
      <Head>
        <title>La Bestia Radio</title>
        <HeadContent />
      </Head>
      <Menu
        wallpaperFolder={props.wallpaperFolder}
        wallpaperCount={props.wallpaperCount}
        custom_names={props.customWallpaperNames}
      />
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
         

        <Banner 
          img_list={["bangers.gif","shure1.gif","corona.gif","shure2.gif","coppola.gif"]}
          link_list={["https://www.instagram.com/bangers.hotdogs/","https://www.shure.com/es-MX","https://coronacapital.com.mx/index.html","https://www.shure.com/es-MX","https://www.instagram.com/coppola_pizzabar/"]}
          mobile={mobile}
        />

        <section
          className={`section-box ${styles.section}`}
          id="twitch-y-chat"
          style={{ backgroundImage: background_src }}
        >
          <Model/>
          <div className={mobile ? styles.icons_mobile : styles.icons_desktop}>
            <IconsAll
              mobile={mobile}
              wallpaperFolder={props.wallpaperFolder}
              wallpaperCount={props.wallpaperCount}
              customWallpaperNames={props.customWallpaperNames}
            />
          </div>
        </section>
        <section
          className={`section-box ${styles.section} ${styles.section2}`}
          id="twitch-y-chat"
          style={{ backgroundImage: background_src }}
        >
          <div className="container">
            <div className={styles.title}>
              <Image
                src="/img/titles/twitch.png"
                alt="TWITCH Y CHAT"
                width={640}
                height={110}
              />
            </div>
            <div className="row">
              <div className="col-lg-6">
                <iframe
                  src="https://player.twitch.tv/?channel=labestiaradio&parent=labestiaradio.com&parent=www.labestiaradio.com&parent=bestia-radio.vercel.app"
                  frameBorder="0"
                  allowFullScreen={true}
                  scrolling="no"
                  height="378"
                  width="100%"
                ></iframe>
              </div>
              <div className="col-lg-6">
                <iframe
                  src="https://www.twitch.tv/embed/labestiaradio/chat?parent=labestiaradio.com&parent=www.labestiaradio.com&parent=bestia-radio.vercel.app"
                  height="378"
                  width="100%"
                ></iframe>
              </div>
            </div> 
          </div>
        </section>
        <section
          className={`section-box ${styles.section} ${styles.section3}`}
          id="la-bestia-tv"
          style={{ backgroundImage: background_src }}
        >
          <div className="container">
            <div className={styles.title}>
              <Image
                src="/img/titles/youtube.png"
                alt="YOUTUBE"
                width={640}
                height={156}
              />
            </div>
            <div className={styles.videos}>
              <div className="row">
                <div className="col-lg-6">
                  {/*<div dangerouslySetInnerHTML={{ __html: video1 }} />*/}
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/KxActAM1luM"
                    title="Youtube Video 1"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="col-lg-6">
                  {/*<div dangerouslySetInnerHTML={{ __html: video2 }} />*/}
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/ZwXb_c5ErNI"
                    title="YouTube Video 2"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </section>        
      </main>
    </div>
  );
}
