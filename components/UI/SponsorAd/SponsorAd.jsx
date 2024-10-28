import React, { useState } from "react";
import styles from "./SponsorAd.module.scss";
import Image from "next/image";
import classNames from "classnames";

export function SponsorAd({ image, link }) {
  console.log("image", image);
  console.log("link", link);
  const [show, setShow] = useState(false);

  setTimeout(() => {
    setShow((prev) => !prev);
  }, 200000);

  return (
    <div
      className={classNames(styles.sponsorAd, {
        [styles.visible]: show,
      })}
    >
      <Image
        src="/img/assets/Butcher-ad-1.png"
        alt="Butcher&Sons"
        width={2155}
        height={968}
        className={styles.sponsorAdImg}
      />
      
      <Image
        src="/img/assets/shure-ad-1.png"
        alt="SHURE"
        width={1155}
        height={368}
        className={styles.sponsorAdImg}
      />
    </div>
  );
}

export default SponsorAd;
