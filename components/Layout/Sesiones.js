import styles from "./Sesiones.module.css";
import { useCallback, useEffect, Fragment } from "react";
import Section from "./Section"
import CustomButton from "../UI/CustomButton";


export default function Sesiones(props) {
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
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    fetchVideosHandler();
  }, [fetchVideosHandler]);

  return (
    <Fragment>
      <Section
        id="sesiones"
        titulo="/img/titulos/sesiones.png"
      >
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
        <CustomButton
          src={"/img/botones/youtube.png"}
          hover_src={"/img/botones/youtube.png"}
          w={140}
          h={40}
          resp_w={"15vw"}
          type="action"
          href="https://www.youtube.com/channel/UCIFMfmZ2OwY8cSmE0P-IMPQ"
          button_class={styles.youtube_button}
        />
      </Section>
    </Fragment>
  );
}
