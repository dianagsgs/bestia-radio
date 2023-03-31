import Head from "next/head";
import Dynamic from "next/dynamic";
import Image from "next/image";
import HeadContent from "../components/Layout/HeadContent";
import Menu from "../components/Layout/Menu";
import Icon from "../components/UI/Icon";
import Modal from "../components/UI/Modal";
import styles from "../styles/index.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import Script from "next/script";
import Banner from "../components/UI/Banner";

const Model = Dynamic(() => import("../components/UI/Model"), { ssr: false });
const Winamp = Dynamic(() => import("../components/UI/Winamp"), { ssr: false });

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

export default function Home(props) {
  const [winampIsActive, setWinampIsActive] = useState(false);
  const [error, setError] = useState(null);
  const [video1, setVideo1] = useState(null);
  const [video2, setVideo2] = useState(null);
  const [modalIsActive, setModalIsActive] = useState(false);
  const [modalType, setModalType] = useState(null);
  const ref = useRef();
  useOnClickOutside(ref, () => setModalIsActive(false));

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

  const modalHandler = (type) => {
    setModalIsActive(true);
    setModalType(type);
  };
  const hideModalHandler = () => {
    setModalIsActive(false);
    setModalType(null);
  };

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
        {modalIsActive && (
          <Modal
            type={modalType}
            ref={ref}
            onHideModal={hideModalHandler}
            wallpaperFolder={props.wallpaperFolder}
            wallpaperCount={props.wallpaperCount}
            custom_names={props.customWallpaperNames}
          />
        )}  

        <Banner 
          img_list={["TPSM.gif","Salvaxe.gif","DTarima.gif"]}
          link_list={["https://www.todoparasumudanza.com/","https://www.salvaxe.mx/","https://dtarima.com/"]}
          mobile={mobile}
        />      
        <section
          className={`section-box ${styles.section} ${styles.section1}`}
          id="iconos-y-bestia"
          style={{ backgroundImage: background_src }}
        >
          {/*<div className={styles.winamp}>{winampIsActive && <Winamp />}</div>*/}
          <div className={styles.icons_desktop}>
            <div className={styles.box}>
              <Icon
                type="link"
                link="https://www.bose.mx/es_mx/index.html"
                img="icon-bose"
                title="Bose ®"
              />
              <Icon
                type="link"
                link="https://www.ko-fi.com/labestiaradiocdmx"
                img="icon-dona"
                title="Dona"
              />
              <Icon
                type="link"
                link="https://labestiaradio.com/radioteca"
                img="icon-radioteca"
                title="Radioteca"
              />
              <Icon
                type="link"
                link="https://www.eventbrite.com/e/la-bestia-presenta-ruido-en-casa-mengers-kexp-dj-set-tickets-579796144877"
                img="RUIDOENCASA"
                title="Ruido en Casa"
              />
            </div>
            <div className={styles.box}>
              <Icon
                type="link"
                link="#la-bestia-tv"
                img="icon1"
                title="La Bestia TV"
              />
              <Icon
                type="link"
                link="#twitch-y-chat"
                img="icon2"
                title="Twitch Y Chat!"
              />
              <Icon
                type="button"
                img="icon3"
                title="Pacta Con La Bestia"
                onClickTrigger={modalHandler.bind(null, "1")}
              />
              <Icon
                type="button"
                img="icon4"
                title="Rola Una Rola"
                onClickTrigger={modalHandler.bind(null, "2")}
              />
              <Icon
                type="button"
                img="icon5"
                title="Las Más Sonaditas"
                onClickTrigger={winampHandler}
              />
            </div>
          </div>
          <div className={styles.icons_mobile}>
            <div className={styles.box}>
              <Icon
                type="link"
                link="#la-bestia-tv"
                img="icon1"
                title="La Bestia TV"
              />
              <Icon
                type="link"
                link="#twitch-y-chat"
                img="icon2"
                title="Twitch Y Chat"
              />
              <Icon
                type="button"
                img="icon3"
                title="Pacta Con La Bestia"
                onClickTrigger={modalHandler.bind(null, "1")}
              />
              <Icon
                type="button"
                img="icon4"
                title="Rola Una Rola"
                onClickTrigger={modalHandler.bind(null, "2")}
              />
              <Icon
                type="button"
                img="icon5"
                title="Las Más Sonaditas"
                onClickTrigger={winampHandler}
              />
              <Icon
                type="link"
                target="_blank"
                link="https://www.somoslabestia.com/shop-1"
                img="icon9"
                title="Merch"
              />
              <Icon
                type="link"
                link="https://www.bose.mx/es_mx/index.html"
                img="icon-bose"
                title="Bose"
              />
              <Icon
                type="link"
                link="https://www.ko-fi.com/labestiaradiocdmx"
                img="icon-dona"
                title="Dona"
              />
              <Icon
                type="link"
                link="https://labestiaradio.com/radioteca"
                img="icon-radioteca"
                title="Radioteca"
              />
              <Icon
                type="button"
                img="icon-wallpaper"
                title="Cambia Tu Wallpaper"
                onClickTrigger={modalHandler.bind(null, "3")}
              />
              <Icon
                type="link"
                link="https://www.eventbrite.com/e/la-bestia-presenta-ruido-en-casa-mengers-kexp-dj-set-tickets-579796144877"
                img="RUIDOENCASA"
                title="Ruido en Casa"
              />
            </div>
          </div>
          <div className={styles.model}>
            <Model />
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
