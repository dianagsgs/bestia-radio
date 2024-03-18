import React, { useState } from "react";
import styles from "./SponsorAd.module.scss";
import Image from "next/image";
import classNames from "classnames";

export function SponsorAd() {
  const [show, setShow] = useState(false);

  setTimeout(() => {
    setShow((prev) => !prev);
  }, 5000);

  return (
    <div
      className={classNames(styles.sponsorAd, {
        [styles.visible]: show,
      })}
    >
      <Image
        src="/img/assets/shure-ad-1.png"
        alt="shure-ad-1"
        width={1155}
        height={368}
        className={styles.sponsorAdImg}
      />
    </div>
  );
}

export default SponsorAd;
