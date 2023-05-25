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
        SESIONES
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
