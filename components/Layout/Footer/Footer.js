import Link from "next/link";
import Redes from "../../UI/Redes"; // TO DO -- usar componente de redes en lugar de repetir trabajo
import styles from "./Footer.module.scss";
import Image from "next/image";

const SOCIAL = [
  {
    icon_src: "insta.png",
    link: "https://www.instagram.com/labestiaradiomx/",
  },
  {
    icon_src: "face.png",
    link: "https://www.facebook.com/labestiaradiomx/",
  },
  {
    icon_src: "youtube.png",
    link: "https://www.youtube.com/@LaBestiaRadio",
  },
  {
    icon_src: "twitch.png",
    link: "https://www.twitch.tv/labestiaradio",
  },
  {
    icon_src: "tiktok.png",
    link: "https://www.tiktok.com/@labestia.666",
  },
  {
    icon_src: "whats.png",
    link: "https://wa.me/5624698330",
  },
];

export const Footer = () => {
  return (
    <div class={styles.footer}>
      {SOCIAL.map((item) => (
        <div className={styles.footerItem}>
          <a href={item.link} target="_blank">
            <Image
              src={`/img/social/${item.icon_src}`}
              alt={item.icon_src}
              width={40}
              height={40}
            />
          </a>
        </div>
      ))}
    </div>
  );
};
