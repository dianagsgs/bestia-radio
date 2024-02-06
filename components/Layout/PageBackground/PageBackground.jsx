import { useState, useEffect } from "react";
import styles from "./PageBackground.module.scss";

const PageBackground = ({ children }) => {
  const [image, setImage] = useState(1);

  useEffect(() => {
    const randomImage = Math.floor(Math.random() * 4) + 1;
    setImage(randomImage);
  }, []);

  return (
    <div
      className={styles.pageBackground}
      style={{ backgroundImage: `url(/img/bg/bg-${image}.png)` }}
    >
      {children}
    </div>
  );
};

export default PageBackground;
