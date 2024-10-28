import { useEffect, useState } from "react";
import styles from "./Banner.module.scss";
import axios from "axios";
import classNames from "classnames";

const Banner = (props) => {
  const [visible, setVisible] = useState(true);
  const [chosen_banner, setBanner] = useState(2);
  const [mobile_list, setMobileList] = useState([]);
  const [desktop_list, setDesktopList] = useState([]);
  const [link_list, setLinkList] = useState([]);

  // use this instead of chosen_banner if we want to just have a random one on page load instead of rotating
  // let rnd_banner = Math.floor(Math.random() * img_list.length);

  const rotateBanner = (list, current) => {
    setTimeout(() => {  
      let new_chosen = current + 1;
      if (new_chosen >= list.length) {
        new_chosen = 0;
      }
      setBanner(new_chosen);
      if (visible) {
        rotateBanner(list, new_chosen);
      }
    }, 20000);
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: "/api/get_banners",
    })
      .then((response) => {
        const response_data = response.data;
        setMobileList(response_data[0]);
        setDesktopList(response_data[1]);
        setLinkList(response_data[2]);

        rotateBanner(link_list, chosen_banner);
        //setBanner(2);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }, []);

  let content =
    link_list.length >= 1 ? (
      <div
        className={classNames(styles.adBanner, {
          [styles.invisible]: !visible,
        })}
      >
        <a href={link_list[chosen_banner]} target="_blank">
          <img
            src={
              props.mobile
                ? mobile_list[chosen_banner]
                : desktop_list[chosen_banner]
            }
            alt="Promotional Banner"
            className={styles.adBannerImg}
          />
        </a>
        <img
          src={`img/close.png`}
          className={props.mobile ? styles.close_mobile : styles.close}
          onClick={() => setVisible(false)}
        />
      </div>
    ) : (
      <span />
    );
  return content;
};

export default Banner;
