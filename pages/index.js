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

  const background_src = "url(/img/Fondo/Fondo.jpg)";

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
         
        {/*<Banner 
          img_list={["marvin.jpg"]}
          link_list={["https://marvin.com.mx/evento/marvin-gateway-2023/"]}
          mobile={mobile}
        />*/}

        <Menu/>

        <section
          className={`section-box ${styles.section} ${styles.section1}`}
          id="iconos-y-bestia"
          style={{ backgroundImage: background_src }}
        >
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
        </section>  

        <section
          className={`section-box ${styles.section} ${styles.section1}`}
          id="iconos-y-bestia"
          style={{ backgroundImage: background_src }}
        >
          section222
        </section>      
      </main>
    </div>
  );
}
