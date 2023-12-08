import { useEffect, useState } from "react";
import styles from "./Banner.module.css";

const Banner = (props) => {
  const [visible, setVisible] = useState(true);
  const [chosen_banner, setBanner] = useState(0);
  
  // use this instead of chosen_banner if we want to just have a random one on page load instead of rotating
  // let rnd_banner = Math.floor(Math.random() * img_list.length);

  const rotateBanner = (list, current) => {
    setTimeout(() => {
      let new_chosen = current + 1;
      if (new_chosen >= list.length) {
        new_chosen = 0;
      }
      setBanner(new_chosen);
      if(visible) {
        rotateBanner(list, new_chosen);
      }
    }, 20000); 
  };

  useEffect(() => {
    rotateBanner(img_list, chosen_banner);
  }, []);

  let img_list = ["corona.gif"];
  let link_list = ["https://coronacapital.com.mx/index.html"];

  let content = img_list.length >= 1 ? (
    <div className={visible ? (props.mobile ? styles.mobile_banner : styles.desktop_banner) : styles.invisible}>
      <a href={link_list[chosen_banner]} target="_blank">
        <img src={`img/banners/${props.mobile ? "mobile" : "desktop"}/${img_list[chosen_banner]}`} alt="Promotional Banner" />
      </a>
      <img src={`img/banners/close.png`} className={props.mobile ? styles.close_mobile : styles.close} onClick={() => setVisible(false)}/>
    </div>
  ) : <span/>;
  return content;
};

export default Banner;
